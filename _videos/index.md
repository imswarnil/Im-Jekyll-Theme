---
layout: default
title: All Videos
permalink: /videos
---

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
      <a href="/" class="button is-light is-small mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left mr-2">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </svg>
        Back to Home
      </a>
      <div class="im-video-header mb-6">
        <h1 class="title is-1">Videos</h1>
        <p class="subtitle is-4">Tutorials, reviews, vlogs, and more</p>
      </div>
      <div class="columns is-multiline">
        {% for video in site.data.videos %}
        <div class="column is-4">
          <div class="im-video-card">
            <div class="im-video-thumbnail">
              <a href="{{ video.url }}">
                <img alt="{{ video.title }}" loading="lazy" width="1280" height="720" decoding="async" class="im-video-image" 
                     src="https://img.youtube.com/vi/{{ video.VideoId }}/hqdefault.jpg">
                <div class="im-video-duration">{{ video.duration }}</div>
                <div class="im-video-play-overlay">
                  <div class="im-video-play-button"><i class="fas fa-play"></i></div>
                </div>
              </a>
            </div>
            <div class="im-video-content">
              <div class="im-video-author">
                <img alt="{{ video.author }}" loading="lazy" width="40" height="40" decoding="async" class="im-video-author-image" src="{{ video.author_image | default: '/placeholder.svg?height=100&width=100' }}">
              </div>
              <div class="im-video-details">
                <a href="{{ video.url }}" class="im-video-title-link">
                  <h3 class="im-video-title">{{ video.title }}</h3>
                </a>
                <div class="im-video-meta">
                  <span class="im-video-author-name">{{ video.author }}</span>
                  <span class="im-video-dot">•</span>
                  <span class="im-video-views">{{ video.views }} views</span>
                  <span class="im-video-dot">•</span>
                  <span class="im-video-date">{{ video.date | date: "%B %d, %Y" }}</span>
                </div>
                <a href="{{ video.url }}" class="button is-primary is-small mt-2">Watch Now</a>
              </div>
            </div>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>
  </section>
</main>