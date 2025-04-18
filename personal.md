---
title: Im Personal Page
description: "Personal Website Template Demo"
image: /assets/logos/logo.svg
permalink : /personal
layout: default
---
<section class="hero is-medium has-background-light-red"><div class="hero-body"><div class="container"><div class="columns is-vcentered"><div class="column is-7"><div class="mb-6"><h1 class="title is-1 has-text-weight-bold">Swarnil Singhai</h1><h2 class="subtitle is-4 has-text-grey-dark">Software Engineer &amp; Content Creator</h2><p class="is-size-5 mb-5">Building software by day, creating content by night. I share my journey in tech, programming tutorials, and lifestyle content to help others grow in their careers.</p><div class="buttons"><a href="/projects" class="button is-primary is-medium is-rounded has-shadow">View My Work</a><a href="/contact" class="button is-light is-medium is-rounded">Get In Touch</a></div></div><div class="social-links"><a href="https://youtube.com" class="social-icon has-text-dark mr-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg></a><a href="https://github.com" class="social-icon has-text-dark mr-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg></a><a href="https://twitter.com" class="social-icon has-text-dark mr-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a><a href="https://linkedin.com" class="social-icon has-text-dark mr-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg></a><a href="https://instagram.com" class="social-icon has-text-dark"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg></a></div></div><div class="column is-5"><div class="profile-image-container"><img alt="Swarnil Singhai" loading="lazy" width="300" height="300" decoding="async" data-nimg="1" class="profile-image" src="/assets/logos/logo.svg" style="color: transparent;"></div></div></div></div></div></section>

<section class="section">
  <div class="container">
    <div class="section-header mb-6">
      <h2 class="title is-2">Recent Activity</h2>
      <p class="subtitle is-5">My latest videos, articles, and podcasts</p>
    </div>
    {% assign all_posts = "" | split: "" %}
    {% for collection in site.collections %}
      {% unless collection.label == "posts" %}
        {% assign all_posts = all_posts | concat: collection.docs %}
      {% endunless %}
    {% endfor %}
    {% assign sorted_posts = all_posts | sort: 'date' | reverse %}
    {% assign recent_posts = sorted_posts | slice: 0, 4 %}
    <div class="columns is-multiline">
      {% for post in recent_posts %}
      <div class="column is-4">
        <div class="card activity-card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img
                alt="{{ post.title }}"
                loading="lazy"
                width="640"
                height="360"
                decoding="async"
                class="activity-thumbnail"
                src="{{ post.thumbnail | default: '/placeholder.svg?height=720&width=1280' }}"
                style="color: transparent;"
              />
              <div class="activity-type {{ post.collection }}">{{ post.collection | capitalize }}</div>
            </figure>
          </div>
          <div class="card-content">
            <p class="is-size-6 has-text-grey mb-2">{{ post.date | date: "%B %d, %Y" }}</p>
            <h3 class="title is-4">{{ post.title }}</h3>
            <p class="content is-size-6 mb-4">
              {{ post.excerpt | strip_html | truncate: 120 }}
            </p>
            <a href="{{ post.url }}" class="button is-primary is-small is-rounded">
              {% if post.collection contains "video" %}Watch Video
              {% elsif post.collection contains "podcast" %}Listen Now
              {% else %}Read More{% endif %}
            </a>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
    <div class="has-text-centered mt-6">
      <a href="/activity" class="button is-primary is-outlined is-rounded">View All Activity</a>
    </div>
  </div>
</section>
