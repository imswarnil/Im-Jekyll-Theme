import requests
import os
from datetime import datetime
import time

API_KEY = os.environ.get("YOUTUBE_API_KEY")
CHANNEL_ID = "UCRkqSGyfZkhOzZIHjlgBXcQ"
POSTS_DIR = "_posts"

def fetch_all_videos():
    videos = []
    url = (
        f"https://www.googleapis.com/youtube/v3/search"
        f"?key={API_KEY}&channelId={CHANNEL_ID}&part=snippet,id"
        f"&order=date&maxResults=50&type=video"
    )
    next_page_token = ""
    while True:
        final_url = url + (f"&pageToken={next_page_token}" if next_page_token else "")
        response = requests.get(final_url)
        response.raise_for_status()
        data = response.json()
        videos.extend(data["items"])
        next_page_token = data.get("nextPageToken")
        if not next_page_token:
            break
        time.sleep(0.1)  # avoid hitting quota
    return videos

def post_exists(video_id):
    for fname in os.listdir(POSTS_DIR):
        if video_id in fname:
            return True
    return False

def create_post(video):
    snippet = video["snippet"]
    video_id = video["id"]["videoId"]
    pub_date = datetime.strptime(snippet["publishedAt"][:10], "%Y-%m-%d")
    title = snippet["title"].replace(":", "-").replace("\"", "")
    filename = f"{POSTS_DIR}/{pub_date.strftime('%Y-%m-%d')}-{video_id}.md"
    if post_exists(video_id):
        return
    with open(filename, "w", encoding="utf-8") as f:
        f.write(f"""---
layout: post
title: "{title}"
description: "{snippet["description"].replace('"', "'")}"
date: {snippet["publishedAt"]}
type: YouTube
category: video
VideoId: {video_id}
author: Swarnil
tags: []
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allowfullscreen></iframe>

{snippet["description"]}
""")

def main():
    os.makedirs(POSTS_DIR, exist_ok=True)
    for video in fetch_all_videos():
        create_post(video)

if __name__ == "__main__":
    main()
