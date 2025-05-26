import os
import re
import glob
from datetime import datetime
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from isodate import parse_duration
import yaml # For reading frontmatter of existing posts
from zoneinfo import ZoneInfo # Requires Python 3.9+; for older, use pytz

# --- Configuration ---
# These will be overridden by environment variables in GitHub Actions
API_KEY = os.environ.get("YOUTUBE_API_KEY", "YOUR_FALLBACK_API_KEY_FOR_LOCAL_TESTING") # Fallback for local
CHANNEL_ID = os.environ.get("YOUTUBE_CHANNEL_ID", "UCRkqSGyfZkhOzZIHjlgBXcQ")
POSTS_DIR = "_posts"
CATEGORY = "video" # As per your example

YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

def get_youtube_service():
    """Initializes and returns the YouTube API service object."""
    return build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=API_KEY)

def format_duration(iso_duration_str):
    """Converts ISO 8601 duration to MM:SS format."""
    duration = parse_duration(iso_duration_str)
    total_seconds = int(duration.total_seconds())
    minutes = total_seconds // 60
    seconds = total_seconds % 60
    return f"{minutes:02d}:{seconds:02d}"

def sanitize_filename(title):
    """Creates a safe filename from a title."""
    title = title.lower()
    title = re.sub(r"[^\w\s-]", "", title) # Remove special characters except word chars, whitespace, hyphens
    title = re.sub(r"\s+", "-", title)    # Replace whitespace with hyphens
    title = re.sub(r"-+", "-", title)     # Replace multiple hyphens with single
    title = title.strip("-")
    return title[:80] # Truncate for safety

def get_existing_video_ids(posts_dir):
    """Scans existing posts and extracts VideoIds from frontmatter."""
    existing_ids = set()
    if not os.path.exists(posts_dir):
        os.makedirs(posts_dir)
        return existing_ids

    for filepath in glob.glob(os.path.join(posts_dir, "*.md")):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Basic frontmatter extraction (assuming --- delimiters)
                if content.startswith("---"):
                    parts = content.split("---", 2)
                    if len(parts) >= 2:
                        frontmatter = yaml.safe_load(parts[1])
                        if frontmatter and "VideoId" in frontmatter:
                            existing_ids.add(frontmatter["VideoId"])
        except Exception as e:
            print(f"Warning: Could not parse frontmatter for {filepath}: {e}")
    return existing_ids

def fetch_channel_videos(youtube, channel_id):
    """Fetches all video details for a given channel."""
    videos_data = []
    try:
        # 1. Get the uploads playlist ID from the channel ID
        channel_response = youtube.channels().list(
            part="contentDetails",
            id=channel_id
        ).execute()

        if not channel_response.get("items"):
            print(f"No channel found for ID: {channel_id}")
            return []

        uploads_playlist_id = channel_response["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]

        # 2. Get all video IDs from the uploads playlist
        video_ids = []
        next_page_token = None
        while True:
            playlist_items_response = youtube.playlistItems().list(
                playlistId=uploads_playlist_id,
                part="contentDetails", # We only need videoId here
                maxResults=50,
                pageToken=next_page_token
            ).execute()

            for item in playlist_items_response.get("items", []):
                video_ids.append(item["contentDetails"]["videoId"])

            next_page_token = playlist_items_response.get("nextPageToken")
            if not next_page_token:
                break
        
        if not video_ids:
            print(f"No videos found in uploads playlist for channel {channel_id}")
            return []

        # 3. Get details for all fetched video IDs (API allows up to 50 IDs per request)
        for i in range(0, len(video_ids), 50):
            chunk_ids = video_ids[i:i+50]
            videos_response = youtube.videos().list(
                part="snippet,contentDetails", # snippet for title, desc, date; contentDetails for duration
                id=",".join(chunk_ids)
            ).execute()

            for video in videos_response.get("items", []):
                videos_data.append({
                    "id": video["id"],
                    "title": video["snippet"]["title"],
                    "description": video["snippet"]["description"].strip().splitlines()[0] if video["snippet"]["description"] else "No description available.", # First line or default
                    "published_at": video["snippet"]["publishedAt"],
                    "duration": video["contentDetails"]["duration"]
                })
        
        return videos_data

    except HttpError as e:
        print(f"An HTTP error {e.resp.status} occurred: {e.content}")
        return []
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return []

def create_jekyll_post(video_info, posts_dir, category):
    """Creates a Jekyll post file for a video."""
    video_id = video_info["id"]
    title = video_info["title"]
    
    # Parse UTC date from YouTube and format
    # YouTube's publishedAt is like: "2017-08-29T07:00:00Z"
    published_dt_utc = datetime.fromisoformat(video_info["published_at"].replace('Z', '+00:00'))
    
    # If you want to ensure the date is considered as per a specific timezone for filename,
    # you can convert it. For simplicity, we'll use the UTC date.
    # Example: Convert to a specific timezone if needed:
    # local_tz = ZoneInfo("America/New_York") # or your desired timezone
    # published_dt_local = published_dt_utc.astimezone(local_tz)
    # post_date_str = published_dt_local.strftime("%Y-%m-%d")
    
    post_date_str = published_dt_utc.strftime("%Y-%m-%d") # Using UTC date for filename and frontmatter
    
    slug = sanitize_filename(title)
    filename = f"{post_date_str}-{slug}.md"
    filepath = os.path.join(posts_dir, filename)

    # Check if a file with this slug already exists, append number if so
    # This is a simple check, more robust would involve checking VideoId against existing posts
    # But since we check existing_video_ids, this is mostly for filename uniqueness if titles are similar on same day
    counter = 1
    original_filename = filename
    while os.path.exists(filepath):
        filename = f"{post_date_str}-{slug}-{counter}.md"
        filepath = os.path.join(posts_dir, filename)
        counter += 1
    
    if original_filename != filename:
        print(f"Warning: Post with similar title on same date exists. Renamed to: {filename}")


    # Prepare frontmatter
    frontmatter = {
        "layout": "post",
        "title": title,
        "description": video_info["description"],
        "date": post_date_str, # Or use published_dt_utc.isoformat() for full timestamp
        "category": category,
        "duration": format_duration(video_info["duration"]),
        "VideoId": video_id
    }

    # Write file
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("---\n")
            yaml.dump(frontmatter, f, allow_unicode=True, sort_keys=False)
            f.write("---\n\n") # Add an empty line after frontmatter for content if any
            # You could add the full description here if desired:
            # f.write(video_info["description"] + "\n")
        print(f"Created post: {filepath}")
        return True
    except Exception as e:
        print(f"Error writing file {filepath}: {e}")
        return False

def main():
    if not API_KEY or API_KEY == "YOUR_FALLBACK_API_KEY_FOR_LOCAL_TESTING":
        print("Error: YOUTUBE_API_KEY environment variable not set or using fallback.")
        print("Please set it in your GitHub Secrets or locally for testing.")
        return

    if not CHANNEL_ID:
        print("Error: YOUTUBE_CHANNEL_ID environment variable not set.")
        return

    print(f"Fetching videos for channel ID: {CHANNEL_ID}")
    youtube = get_youtube_service()
    if not youtube:
        return

    videos = fetch_channel_videos(youtube, CHANNEL_ID)
    if not videos:
        print("No videos found or an error occurred.")
        return

    existing_video_ids = get_existing_video_ids(POSTS_DIR)
    print(f"Found {len(existing_video_ids)} existing video posts.")

    new_posts_created = 0
    for video_info in reversed(videos): # Process older videos first, if order matters
        if video_info["id"] not in existing_video_ids:
            print(f"Processing new video: {video_info['title']} (ID: {video_info['id']})")
            if create_jekyll_post(video_info, POSTS_DIR, CATEGORY):
                new_posts_created += 1
        else:
            print(f"Skipping existing video: {video_info['title']} (ID: {video_info['id']})")

    print(f"\n--- Summary ---")
    print(f"Total videos fetched from YouTube: {len(videos)}")
    print(f"New posts created: {new_posts_created}")
    if new_posts_created > 0:
        print(f"New posts are in the '{POSTS_DIR}' directory.")
    else:
        print("No new videos to post.")

if __name__ == "__main__":
    # Ensure _posts directory exists
    if not os.path.exists(POSTS_DIR):
        print(f"Creating directory: {POSTS_DIR}")
        os.makedirs(POSTS_DIR)
    main()
