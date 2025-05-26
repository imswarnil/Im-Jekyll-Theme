import requests
import os
from datetime import datetime

API_KEY = os.environ.get("YOUTUBE_API_KEY")
CHANNEL_ID = "UCRkqSGyfZkhOzZIHjlgBXcQ"
POSTS_DIR = "_posts"

def fetch_videos():
    url = (
        f"https://www.googleapis.com/youtube/v3/search"
        f"?key={API_KEY}&channelId={CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video"
    )
    response = requests.get(url)
    response.raise_for_status()
    return response.json()["items"]

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
category: video
type: YouTube
VideoId: {video_id}
author: Swarnil
tags: []
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/{video_id}" frameborder="0" allowfullscreen></iframe>

{snippet["description"]}
""")

def main():
    os.makedirs(POSTS_DIR, exist_ok=True)
    for video in fetch_videos():
        create_post(video)

if __name__ == "__main__":
    main()
