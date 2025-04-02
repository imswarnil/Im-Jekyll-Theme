---
layout: default
title: All Videos
permalink: /videos
---

{% assign categories = site.videos | map: 'category' | uniq %}
{% assign tags = site.videos | map: 'tags' | join: ',' | split: ',' | uniq %}

<main class="im-video-page">
  <div class="container mt-4">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/videos">Videos</a></li>
      </ul>
    </nav>
  </div>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-one-quarter">
          <aside class="menu">
            <p class="menu-label">Categories</p>
            <ul class="menu-list">
              <li><a href="?category=all">All Videos</a></li>
              {% for category in categories %}
              <li><a href="?category={{ category | url_encode }}">{{ category }}</a></li>
              {% endfor %}
            </ul>
            <p class="menu-label">Tags</p>
            <ul class="menu-list">
              {% for tag in tags %}
              <li><a href="?tag={{ tag | url_encode }}">#{{ tag }}</a></li>
              {% endfor %}
            </ul>
          </aside>
        </div>
        <div class="column">
          <div class="im-video-search mb-5">
            <div class="field has-addons">
              <div class="control is-expanded">
                <input class="input" id="video-search" placeholder="Search videos..." type="text">
              </div>
              <div class="control">
                <button class="button is-primary" onclick="filterVideos()">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="columns is-multiline" id="video-list">
            {% for video in site.videos %}
            <div class="column is-4 video-item" data-category="{{ video.category }}" data-tags="{{ video.tags | join: ',' }}">
              <div class="im-video-card">
                <div class="im-video-thumbnail">
                  <a href="{{ video.url }}">
                    <img alt="{{ video.title }}" loading="lazy" class="im-video-image" 
                         src="https://img.youtube.com/vi/{{ video.VideoId }}/hqdefault.jpg"
                         onerror="this.src='/fallback-thumbnail.jpg'">
                    <div class="im-video-duration">{{ video.duration }}</div>
                    <div class="im-video-play-overlay">
                      <i class="fas fa-play"></i>
                    </div>
                  </a>
                </div>
                <div class="im-video-content">
                  <h3 class="im-video-title">{{ video.title }}</h3>
                  <p>{{ video.description }}</p>
                  <div class="im-video-meta">
                    <span>{{ video.author }}</span>
                    <span>•</span>
                    <span>{{ video.views }} views</span>
                    <span>•</span>
                    <span>{{ video.date | date: "%B %d, %Y" }}</span>
                  </div>
                  <a href="{{ video.url }}" class="button is-primary is-small mt-2">Watch Now</a>
                </div>
              </div>
            </div>
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<script>
function filterVideos() {
  let searchQuery = document.getElementById('video-search').value.toLowerCase();
  let videos = document.querySelectorAll('.video-item');
  videos.forEach(video => {
    let title = video.querySelector('.im-video-title').innerText.toLowerCase();
    let tags = video.getAttribute('data-tags').toLowerCase();
    video.style.display = (title.includes(searchQuery) || tags.includes(searchQuery)) ? 'block' : 'none';
  });
}
</script>