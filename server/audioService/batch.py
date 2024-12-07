import yt_dlp
import os
from concurrent.futures import ThreadPoolExecutor
from typing import List, Dict
import argparse
from pathlib import Path


def setup_yt_dlp_options(output_dir: str) -> Dict:
    """Configure yt-dlp options for audio download with video ID as filename."""
    return {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'mp3',
            'preferredquality': '192',
        }],
        'outtmpl': os.path.join(output_dir, '%(id)s.%(ext)s'),
        'verbose': False,
        'quiet': True,
        'no_warnings': True,
    }


def get_video_url(video_id: str) -> str:
    """Convert video ID to full YouTube URL."""
    return f"https://www.youtube.com/watch?v={video_id}"


def download_audio(video_id: str, options: Dict) -> bool:
    """
    Download audio from a YouTube video ID.
    Returns True if successful, False otherwise.
    """
    try:
        url = get_video_url(video_id)
        with yt_dlp.YoutubeDL(options) as ydl:
            print(f"Downloading video ID: {video_id}")
            ydl.download([url])
            return True
    except Exception as e:
        print(f"Error downloading video ID {video_id}: {str(e)}")
        return False


def batch_download(video_ids: List[str], output_dir: str, max_workers: int = 3) -> None:
    """
    Download multiple YouTube videos as MP3 files concurrently.

    Args:
        video_ids: List of YouTube video IDs
        output_dir: Directory to save the MP3 files
        max_workers: Maximum number of concurrent downloads
    """
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Configure yt-dlp options
    options = setup_yt_dlp_options(output_dir)

    # Download files using thread pool
    successful = 0
    failed = 0

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(
            lambda vid: download_audio(vid, options), video_ids))

        successful = sum(1 for x in results if x)
        failed = sum(1 for x in results if not x)

    # Print summary
    print("\nDownload Summary:")
    print(f"Total Video IDs: {len(video_ids)}")
    print(f"Successful: {successful}")
    print(f"Failed: {failed}")


def read_video_ids_from_file(file_path: str) -> List[str]:
    """Read video IDs from a text file, one ID per line."""
    with open(file_path, 'r') as f:
        return [line.strip() for line in f if line.strip()]


def main():
    parser = argparse.ArgumentParser(
        description='Batch download YouTube videos as MP3s using video IDs')
    parser.add_argument('--input', '-i', type=str,
                        help='Input file containing YouTube video IDs (one per line)')
    parser.add_argument('--output-dir', '-o', type=str,
                        default='downloads', help='Output directory for MP3 files')
    parser.add_argument('--workers', '-w', type=int, default=3,
                        help='Number of concurrent downloads')

    args = parser.parse_args()

    if not args.input:
        print("Please provide an input file with YouTube video IDs")
        return

    video_ids = read_video_ids_from_file(args.input)
    if not video_ids:
        print("No video IDs found in input file")
        return

    print(f"Found {len(video_ids)} video IDs in input file")
    batch_download(video_ids, args.output_dir, args.workers)


if __name__ == "__main__":
    main()
