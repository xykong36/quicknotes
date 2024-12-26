import os
import json
import logging
from typing import List, Dict, Optional
from pathlib import Path
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
from youtube_transcript_api.formatters import JSONFormatter


class TranscriptDownloader:
    def __init__(self, proxy_settings: Optional[Dict[str, str]] = None):
        """Initialize the transcript downloader with optional proxy settings."""
        self.proxy_settings = proxy_settings or {
            'http': 'socks5://127.0.0.1:1080',
            'https': 'socks5://127.0.0.1:1080'
        }
        self.setup_logging()

    def setup_logging(self):
        """Configure logging settings."""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('transcript_download.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)

    def read_video_ids(self, file_path: str) -> List[str]:
        """Read video IDs from a text file."""
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                return [line.strip() for line in file if line.strip()]
        except FileNotFoundError:
            self.logger.error(f"Input file not found: {file_path}")
            raise
        except Exception as e:
            self.logger.error(f"Error reading video IDs: {str(e)}")
            raise

    def download_transcripts(self, video_ids: List[str], languages: List[str] = ['en']) -> Dict:
        """Download transcripts for multiple videos with error handling."""
        all_transcripts = {}

        for video_id in video_ids:
            try:
                transcript_list = YouTubeTranscriptApi.get_transcript(
                    video_id,
                    languages=languages,
                    proxies=self.proxy_settings
                )
                all_transcripts[video_id] = transcript_list
                self.logger.info(
                    f"Successfully downloaded transcript for video: {video_id}")

            except (TranscriptsDisabled, NoTranscriptFound) as e:
                self.logger.warning(f"No transcript available for video {
                                    video_id}: {str(e)}")
                continue
            except Exception as e:
                self.logger.error(f"Error downloading transcript for video {
                                  video_id}: {str(e)}")
                continue

        return all_transcripts

    def save_transcripts(self, transcripts: Dict, output_file: str):
        """Save transcripts to a JSON file."""
        try:
            formatter = JSONFormatter()
            output_path = Path(output_file)
            output_path.parent.mkdir(parents=True, exist_ok=True)

            # Convert the dictionary to the expected format
            formatted_transcripts = {
                video_id: {
                    'transcript': transcript
                } for video_id, transcript in transcripts.items()
            }

            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(formatted_transcripts, f,
                          ensure_ascii=False, indent=2)

            self.logger.info(
                f"Successfully saved transcripts to: {output_file}")

        except Exception as e:
            self.logger.error(f"Error saving transcripts: {str(e)}")
            raise


def main():
    # Configuration
    INPUT_FILE = 'vids.txt'
    OUTPUT_FILE = 'transcripts/vids-transcripts.json'
    LANGUAGES = ['en']

    # Initialize downloader
    downloader = TranscriptDownloader()

    try:
        # Read video IDs
        video_ids = downloader.read_video_ids(INPUT_FILE)

        # Download transcripts
        transcripts = downloader.download_transcripts(video_ids, LANGUAGES)

        # Save results
        downloader.save_transcripts(transcripts, OUTPUT_FILE)

    except Exception as e:
        downloader.logger.error(f"Script execution failed: {str(e)}")
        raise


if __name__ == "__main__":
    main()
