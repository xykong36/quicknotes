import yt_dlp
import os
from concurrent.futures import ThreadPoolExecutor
from typing import List, Dict, Tuple
import argparse
from pathlib import Path
from datetime import datetime


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
        'proxy': 'socks5://127.0.0.1:1080',
        'socket_timeout': 30,
    }


def get_video_url(video_id: str) -> str:
    """Convert video ID to full YouTube URL."""
    return f"https://www.youtube.com/watch?v={video_id}"


def check_file_exists(video_id: str, output_dir: str) -> bool:
    """
    Check if MP3 file for given video ID already exists in output directory.

    Args:
        video_id: YouTube video ID
        output_dir: Directory to check for existing files

    Returns:
        bool: True if file exists, False otherwise
    """
    expected_file = os.path.join(output_dir, f"{video_id}.mp3")
    return os.path.isfile(expected_file)


def download_audio(video_id: str, options: Dict, output_dir: str) -> Tuple[str, str]:
    """
    Download audio from a YouTube video ID with skip existing functionality.

    Returns:
        Tuple[str, str]: (video_id, status) where status is 'skipped', 'success', or 'failed'
    """
    # Check if file already exists
    if check_file_exists(video_id, output_dir):
        print(f"Skipping {video_id} (file already exists)")
        return video_id, 'skipped'

    try:
        url = get_video_url(video_id)
        with yt_dlp.YoutubeDL(options) as ydl:
            print(f"Downloading video ID: {video_id}")
            ydl.download([url])
            return video_id, 'success'
    except Exception as e:
        print(f"Error downloading video ID {video_id}: {str(e)}")
        return video_id, 'failed'


def batch_download(video_ids: List[str], output_dir: str, max_workers: int = 3) -> Dict[str, int]:
    """
    Download multiple YouTube videos as MP3 files concurrently.
    Skips downloads for existing files.

    Args:
        video_ids: List of YouTube video IDs
        output_dir: Directory to save the MP3 files
        max_workers: Maximum number of concurrent downloads

    Returns:
        Dict containing download statistics
    """
    # Create output directory if it doesn't exist
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # Configure yt-dlp options
    options = setup_yt_dlp_options(output_dir)

    # Track statistics
    stats = {
        'total': len(video_ids),
        'success': 0,
        'failed': 0,
        'skipped': 0
    }

    print(f"\nStarting batch download of {len(video_ids)} videos...")
    start_time = datetime.now()

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = [
            executor.submit(download_audio, vid, options, output_dir)
            for vid in video_ids
        ]

        # Process results as they complete
        for future in futures:
            try:
                video_id, status = future.result()
                stats[status] += 1

                # Print progress
                total_processed = sum(stats[k]
                                      for k in ['success', 'failed', 'skipped'])
                print(f"Progress: {total_processed}/{stats['total']} " +
                      f"(Success: {stats['success']}, Failed: {stats['failed']}, " +
                      f"Skipped: {stats['skipped']})")

            except Exception as e:
                print(f"Error processing download result: {str(e)}")
                stats['failed'] += 1

    # Calculate duration
    duration = datetime.now() - start_time

    # Print final summary
    print("\nDownload Summary:")
    print(f"Total Video IDs: {stats['total']}")
    print(f"Successful: {stats['success']}")
    print(f"Skipped (already exists): {stats['skipped']}")
    print(f"Failed: {stats['failed']}")
    print(f"Total Duration: {duration}")

    if stats['failed'] > 0:
        print("\nNote: Check the console output above for details on failed downloads.")

    return stats


def read_video_ids_from_file(file_path: str) -> List[str]:
    """Read video IDs from a text file, one ID per line."""
    try:
        with open(file_path, 'r') as f:
            # Skip lines starting with # (comments) and empty lines
            return [line.strip() for line in f
                    if line.strip() and not line.strip().startswith('#')]
    except Exception as e:
        print(f"Error reading input file: {str(e)}")
        return []


def main():
    parser = argparse.ArgumentParser(
        description='Batch download YouTube videos as MP3s using video IDs')
    parser.add_argument('--input', '-i', type=str, required=True,
                        help='Input file containing YouTube video IDs (one per line)')
    parser.add_argument('--output-dir', '-o', type=str,
                        default='downloads', help='Output directory for MP3 files')
    parser.add_argument('--workers', '-w', type=int, default=3,
                        help='Number of concurrent downloads')

    args = parser.parse_args()

    video_ids = read_video_ids_from_file(args.input)
    if not video_ids:
        print("No video IDs found in input file")
        return

    print(f"Found {len(video_ids)} video IDs in input file")
    stats = batch_download(video_ids, args.output_dir, args.workers)

    # Exit with error code if any downloads failed
    if stats['failed'] > 0:
        exit(1)


if __name__ == "__main__":
    main()
