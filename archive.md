---
title: archive
description: "All Archive"
layout : page
---

{% assign grouped = site.posts | group_by_exp: "post", "post.date | date: '%B %Y'" %}
<div class="timeline is-centered is-medium">
  <header class="timeline-header">
    <span class="tag is-large is-primary">Start</span>
  </header>

  {% for group in grouped reversed %}
    <div class="timeline-item is-info">
      <div class="timeline-marker is-icon">
        <i class="fas fa-calendar-alt"></i>
      </div>
      <div class="timeline-content">
        <p class="heading">{{ group.name }}</p>
        <ul>
          {% for post in group.items %}
            <li>
              <a href="{{ post.url }}">
                <i class="fas {{ post.icon | default: 'fa-file-alt' }} mr-2"></i>
                {{ post.title }}
              </a>
            </li>
          {% endfor %}
        </ul>
      </div>
    </div>
  {% endfor %}

  <header class="timeline-header">
    <span class="tag is-small is-light">End</span>
  </header>
</div>
