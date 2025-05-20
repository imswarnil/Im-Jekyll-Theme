---
layout: archive
title: Archives
permalink: /archives/
---
<div class="box">
  <h2 class="title is-4">{{ page.title }}</h2>
  <ul>
    {% for post in page.posts %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span class="is-size-7 has-text-grey">{{ post.date | date: "%d %B %Y" }}</span>
      </li>
    {% endfor %}
  </ul>
</div>
