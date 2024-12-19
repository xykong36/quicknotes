import requests
from urllib.parse import urljoin
import random
import json
import re
from typing import List, Dict, Optional
from datetime import datetime


def get_random_user_agent():
    """Return a random modern browser user agent."""
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
    ]
    return random.choice(user_agents)


def fetch_youtube_channel(channel_url):
    """
    Fetch YouTube channel content while mimicking a browser request.

    Args:
        channel_url (str): The URL of the YouTube channel

    Returns:
        requests.Response: The response from the server
    """
    # Headers to mimic a browser request
    headers = {
        'User-Agent': get_random_user_agent(),
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'DNT': '1',  # Do Not Track
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0'
    }

    # Additional parameters that browsers typically send
    params = {
        'hl': 'en',  # Language
        'gl': 'US',  # Geographic location
    }

    try:
        # Send the request with a timeout
        response = requests.get(
            channel_url,
            headers=headers,
            params=params,
            timeout=10,
            allow_redirects=True
        )

        # Raise an exception for bad status codes
        response.raise_for_status()

        return response

    except requests.exceptions.RequestException as e:
        print(f"Error fetching the channel: {str(e)}")
        return None


def extract_initial_data(html_content: str) -> Optional[dict]:
    """
    Extract ytInitialData from YouTube page HTML content.

    Args:
        html_content (str): The HTML content of the YouTube page

    Returns:
        Optional[dict]: Parsed ytInitialData or None if not found
    """
    # Look for ytInitialData in script tag
    pattern = r'var ytInitialData = ({.*?});</script>'
    match = re.search(pattern, html_content)

    if not match:
        return None

    try:
        return json.loads(match.group(1))
    except json.JSONDecodeError as e:
        print(f"Error parsing ytInitialData: {str(e)}")
        return None


def extract_video_metadata(html_content: str) -> List[Dict]:
    """
    Extract video metadata from YouTube channel page HTML content.

    Args:
        html_content (str): The HTML content of the YouTube channel page

    Returns:
        List[Dict]: List of dictionaries containing video metadata
    """
    initial_data = extract_initial_data(html_content)
    if not initial_data:
        return []

    videos = []
    try:
        # Navigate through the JSON structure to find video content
        tabs = (initial_data.get('contents', {})
                .get('twoColumnBrowseResultsRenderer', {})
                .get('tabs', []))

        # Find the Videos tab
        videos_tab = next(
            (tab.get('tabRenderer', {}).get('content', {})
             for tab in tabs
             if tab.get('tabRenderer', {}).get('title') == 'Videos'),
            {}
        )

        # Get the video list
        contents = (videos_tab.get('richGridRenderer', {})
                    .get('contents', []))

        for item in contents:
            video_renderer = (item.get('richItemRenderer', {})
                              .get('content', {})
                              .get('videoRenderer', {}))

            if not video_renderer:
                continue

            # Extract basic metadata
            video_id = video_renderer.get('videoId')
            if not video_id:
                continue

            # Get the highest quality thumbnail
            thumbnails = (video_renderer.get('thumbnail', {})
                          .get('thumbnails', []))
            # Sort thumbnails by width to get the highest quality
            sorted_thumbnails = sorted(thumbnails,
                                       key=lambda x: x.get('width', 0),
                                       reverse=True)
            thumbnail_url = sorted_thumbnails[0].get(
                'url') if sorted_thumbnails else None

            # Extract title
            title = ''
            title_runs = (video_renderer.get('title', {})
                          .get('runs', []))
            if title_runs:
                title = title_runs[0].get('text', '')

            # Extract additional metadata
            view_count = (video_renderer.get('viewCountText', {})
                          .get('simpleText', '0 views'))

            published_time = (video_renderer.get('publishedTimeText', {})
                              .get('simpleText', ''))

            duration = (video_renderer.get('lengthText', {})
                        .get('simpleText', ''))

            description = ''
            desc_runs = (video_renderer.get('descriptionSnippet', {})
                         .get('runs', []))
            if desc_runs:
                description = desc_runs[0].get('text', '')

            # Get accessibility label which sometimes contains additional info
            accessibility_label = (video_renderer.get('title', {})
                                   .get('accessibility', {})
                                   .get('accessibilityData', {})
                                   .get('label', ''))

            # Create video metadata object
            video_data = {
                'video_id': video_id,
                'title': title,
                'thumbnail_url': thumbnail_url,
                'view_count': view_count,
                'published_time': published_time,
                'duration': duration,
                'description': description,
                'accessibility_label': accessibility_label,
                'url': f'https://www.youtube.com/watch?v={video_id}'
            }

            videos.append(video_data)

    except Exception as e:
        print(f"Error extracting video metadata: {str(e)}")

    return videos


def save_metadata_to_file(videos: List[Dict], filename):
    """
    Save the extracted video metadata to a JSON file.

    Args:
        videos (List[Dict]): List of video metadata dictionaries
        filename (str): Output filename
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(videos, f, ensure_ascii=False, indent=2)
        print(f"Successfully saved metadata to {filename}")
    except Exception as e:
        print(f"Error saving metadata to file: {str(e)}")


def generate_video_filename(url):
    """
    Generate a filename for YouTube channel videos data in the format:
    {channel}-{date}-latest-videos.json

    Args:
        url (str): YouTube channel URL

    Returns:
        str: Formatted filename or None if channel name cannot be extracted

    Examples:
        >>> generate_video_filename('https://www.youtube.com/@JaySwanson/videos')
        'jayswanson-2024-12-05-latest-videos.json'
    """
    try:
        # Extract channel name
        if '@' not in url:
            return None

        channel_with_suffix = url.split('@')[1]
        channel_name = channel_with_suffix.split('/')[0]

        # Clean and format channel name (lowercase, remove special chars)
        clean_channel = channel_name.lower()

        # Get current date in YYYY-MM-DD format
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Generate filename
        filename = f"{clean_channel}-{current_date}-latest-videos.json"

        return filename

    except Exception as e:
        print(f"Error generating filename: {e}")
        return None


def fetch_youtube_channel_to_json(channel_url):
    """
    Fetches and processes YouTube channel data to extract video metadata.

    Args:
        channel_url (str): URL of the YouTube channel to process

    Returns:
        tuple: (list of video metadata, filename where metadata was saved)
        or (None, None) if processing failed
    """
    try:
        response = fetch_youtube_channel(channel_url)
        if response and response.status_code == 200:
            print(
                f"Successfully fetched the channel. Response length: {len(response.text)} bytes")
        else:
            print("Failed to fetch the channel")
            return None, None

        videos = extract_video_metadata(response.text)
        videos_filename = generate_video_filename(channel_url)

        if videos:
            print(f"Successfully extracted metadata for {len(videos)} videos")
            # Save to file
            save_metadata_to_file(videos, videos_filename)

            # Print first video as example
            print("\nExample of first video metadata:")
            print(json.dumps(videos[0], indent=2))

            return videos, videos_filename
        else:
            print("No videos found in the response")
            return None, None

    except Exception as e:
        print(f"Error processing channel: {str(e)}")
        return None, None


if __name__ == "__main__":
    channel_url = 'https://www.youtube.com/@JaySwanson/videos'
    fetch_youtube_channel_to_json(channel_url)
