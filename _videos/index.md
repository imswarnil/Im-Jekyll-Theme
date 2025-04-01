---
layout: default
title: All Videos
permalink: /videos
---

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
                  <!-- Use a thumbnail image for the video -->
                  <img src="https://img.youtube.com/vi/{{ video.VideoId }}/hqdefault.jpg" alt="{{ video.title }}">
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
