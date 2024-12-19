import pandas as pd
import json
from datetime import datetime
import re
import logging

# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EpisodeProcessor:
    def __init__(self, csv_path: str):
        """初始化处理器"""
        self.csv_path = csv_path

    def extract_video_id(self, url: str) -> str:
        """从YouTube URL中提取video_id"""
        if not isinstance(url, str):
            return ''

        try:
            patterns = [
                r'(?:v=|v/|embed/|youtu\.be/)([^"&?/\s]{11})',
                r'(?:youtube\.com/watch\?si=.*&v=)([^"&?\s]{11})'
            ]

            for pattern in patterns:
                match = re.search(pattern, url)
                if match:
                    return match.group(1)
            return ''
        except Exception:
            return ''

    def process_regular_episode(self, row: pd.Series) -> dict:
        """处理普通课程"""
        # 如果video_id为空，从URL提取
        video_id = row['video_id'] if pd.notna(
            row['video_id']) else self.extract_video_id(row['youtube_url'])

        return {
            'episode_id': str(row['episode_id']),
            'video_id': video_id,
            'youtube_url': row['youtube_url'],
            'topic_tag': row['topic_tag'],
            'youtube_creator': row['youtube_creator']
        }

    def process_review_episode(self, row: pd.Series) -> dict:
        """处理复习课"""
        return {
            'episode_id': str(row['episode_id']),
            'video_id': '',
            'youtube_url': '',
            'topic_tag': row['topic_tag'],
            'youtube_creator': ''
        }

    def clean_data(self, df: pd.DataFrame) -> list:
        """清理并处理数据"""
        # 重命名列
        df = df.rename(columns={
            'Video ID': 'video_id',
            'Youtube URL': 'youtube_url',
            '主题': 'topic_tag',
            '博主': 'youtube_creator'
        })

        # 过滤掉完全空行
        df = df[df['topic_tag'].notna()]

        # 生成连续的episode_id
        df['episode_id'] = range(1, len(df) + 1)

        # 处理每一行数据
        episodes = []
        for _, row in df.iterrows():
            if '复习课' in str(row['topic_tag']):
                episode = self.process_review_episode(row)
            else:
                episode = self.process_regular_episode(row)
            episodes.append(episode)

        return episodes

    def process_csv(self) -> dict:
        """处理CSV文件并返回JSON格式数据"""
        try:
            # 读取CSV文件
            df = pd.read_csv(self.csv_path)

            # 清理并处理数据
            episodes = self.clean_data(df)

            # 创建最终的JSON结构
            json_data = {
                'episodes': episodes,
                'metadata': {
                    'total_episodes': len(episodes),
                    'last_updated': datetime.now().strftime('%Y-%m-%d')
                }
            }

            return json_data

        except Exception as e:
            logger.error(f"Error processing CSV file: {e}")
            raise

    def save_json(self, json_data: dict, output_path: str):
        """保存JSON数据到文件"""
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, ensure_ascii=False, indent=2)

            total_episodes = len(json_data['episodes'])
            reviews = sum(
                1 for ep in json_data['episodes'] if '复习课' in ep['topic_tag'])
            regular = total_episodes - reviews

            logger.info(f"\nProcessing Summary:")
            logger.info(f"Total episodes: {total_episodes}")
            logger.info(f"Regular episodes: {regular}")
            logger.info(f"Review episodes: {reviews}")

            # 打印示例
            print("\nExample episodes:")
            # 打印前2个普通课程
            print("\nRegular episodes:")
            regular_episodes = [
                ep for ep in json_data['episodes'] if '复习课' not in ep['topic_tag']][:2]
            for episode in regular_episodes:
                print(json.dumps(episode, ensure_ascii=False, indent=2))

            # 打印1个复习课程
            print("\nReview episode:")
            review_episode = next(
                (ep for ep in json_data['episodes'] if '复习课' in ep['topic_tag']), None)
            if review_episode:
                print(json.dumps(review_episode, ensure_ascii=False, indent=2))

        except Exception as e:
            logger.error(f"Error saving JSON file: {e}")
            raise


def main():
    """主函数"""
    try:
        # 初始化处理器
        processor = EpisodeProcessor('videos.csv')

        # 处理数据
        json_data = processor.process_csv()

        # 保存结果
        processor.save_json(json_data, 'episodes.json')

        logger.info("Processing completed successfully")

    except Exception as e:
        logger.error(f"Processing failed: {e}")
        raise


if __name__ == '__main__':
    main()
