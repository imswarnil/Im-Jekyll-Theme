---
layout: series_listing
title: "Web Series"
permalink: /webseries/
---

# All Web Series

{% assign all_series = site.webseries | where: "content_type", "series" | sort: "title" %}

<div class="series-grid">
  {% for series in all_series %}
    <div class="series-card">
      <a href="{{ series.url }}">
        <img src="{{ series.thumbnail }}" alt="{{ series.title }}">
        <h3>{{ series.title }}</h3>
        <p>{{ series.short_description }}</p>
        <span class="episode-count">
          {{ series.episodes.size }} episodes
        </span>
      </a>
    </div>
  {% endfor %}
</div>