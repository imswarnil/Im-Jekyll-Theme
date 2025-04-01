---
layout: default
title: All Videos
permalink : /videos
---

<h1>{{ page.title }}</h1>

<ul>
  {% for video in site.videos %}
    <li><a href="{{ video.url }}">{{ video.title }}</a></li>
  {% endfor %}
</ul>
