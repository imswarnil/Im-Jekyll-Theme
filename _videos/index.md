---
layout: default
title: All Videos
permalink: /videos
---
<input type="text" id="video-search" placeholder="Search videos..." />
<div id="search-results"></div>
<style>#search-results {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  width: 100%;
}

.search-result {
  padding: 8px;
  cursor: pointer;
}

.search-result:hover {
  background: #f0f0f0;
}

    </style>
<script>
    document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("video-search");
  const resultsContainer = document.getElementById("search-results");

  let videos = [];

  // Fetch video data
  fetch("/videos.json")
    .then((response) => response.json())
    .then((data) => (videos = data));

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length === 0) return;

    const filteredVideos = videos.filter((video) =>
      video.title.toLowerCase().includes(query)
    );

    filteredVideos.forEach((video) => {
      const item = document.createElement("div");
      item.classList.add("search-result");
      item.textContent = video.title;
      item.addEventListener("click", () => {
        window.location.href = video.url;
      });
      resultsContainer.appendChild(item);
    });
  });
});

    </script>

<section class="section">
  <div class="container">
    <h1 class="title has-text-centered">{{ page.title }}</h1>
    <div class="columns is-multiline">
      {% for video in site.videos %}
        {% if video.path != "videos/index.md" %}
          <div class="column is-one-third">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <!-- Check if preview video exists -->
                  {% if video.preview %}
                    <video autoplay loop muted playsinline class="has-ratio">
                      <source src="{{ video.preview }}" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  {% else %}
                    <!-- Use YouTube thumbnail image if no video preview is available -->
                    <img src="https://img.youtube.com/vi/{{ video.VideoId }}/hqdefault.jpg" alt="{{ video.title }}">
                  {% endif %}
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">
                      <a href="{{ video.url }}" class="has-text-dark">{{ video.title }}</a>
                    </p>
                    <p class="subtitle is-6">{{ video.author }}</p>
                  </div>
                </div>
                <div class="content">
                  <p>{{ video.description | truncate: 100 }}</p>
                  <a href="{{ video.url }}" class="button is-link is-small">Watch Video</a>
                </div>
              </div>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>
