---
title: Im Jekyll Theme
description: "An open-source Jekyll theme crafted using the Bulma CSS framework. This theme utilizes Bulma SCSS, making it incredibly easy to customize and adapt to your specific needs. With over 7 layouts and 10+ collections"
image: /assets/logos/logo.svg
layout: default
---


<section class="hero is-fullheight-with-navbar is-dark is-bold">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-vcentered is-multiline">
        <!-- Profile Image -->
        <div class="column is-4-tablet is-3-desktop has-text-centered">
          <figure class="image is-1by1 is-inline-block">
            <img class="is-rounded" src="{{ site.author.image }}" alt="{{ site.author.name }}">
          </figure>
        </div>
        <!-- Intro & Bio -->
        <div class="column is-8-tablet is-9-desktop">
          <h1 class="title is-2 has-text-white">{{ site.author.name }}</h1>
          <h2 class="subtitle is-4 has-text-light">{{ site.author.tagline }}</h2>
          <p class="has-text-grey-lighter mb-4">
            {{ site.author.bio }}
          </p>
          <!-- Quick Stats / Setup -->
          <div class="columns is-mobile is-multiline is-variable is-1 mb-4">
            <div class="column is-6-mobile is-4-tablet">
              <p><strong>📍 Location:</strong> {{ site.author.location }}</p>
              <p><strong>🎂 DOB:</strong> {{ site.author.dob }}</p>
              <p><strong>💻 OS:</strong> {{ site.author.uses.operating_system }}</p>
            </div>
            <div class="column is-6-mobile is-4-tablet">
              <p><strong>🖥️ Computer:</strong> {{ site.author.uses.computer }}</p>
              <p><strong>📷 Camera:</strong> {{ site.author.uses.camera_gear | join: ", " }}</p>
              <p><strong>🧠 Stack:</strong> {{ site.author.uses.website_stack | join: ", " }}</p>
            </div>
          </div>
          <!-- Social Media -->
          <div class="buttons">
            {% for social in site.social_media %}
              <a class="button is-small is-link is-outlined" href="{{ social.url }}" target="_blank">
                <span class="icon"><i class="{{ social.icon }}"></i></span>
                <span>{{ social.name | capitalize }}</span>
              </a>
            {% endfor %}
          </div>
        </div>
      </div>
      <!-- Career Timeline -->
      <div class="section">
        <h3 class="title is-4 has-text-white">🚀 Career Journey</h3>
        <div class="timeline is-centered">
          {% for job in site.author.work_experience %}
            <div class="timeline-item">
              <div class="timeline-marker is-icon">
                <i class="ph-duotone ph-briefcase"></i>
              </div>
              <div class="timeline-content">
                <p class="heading has-text-grey-light">
                  {{ job.start_date }} → 
                  {% if job.current %} Present {% else %} {{ job.end_date }} {% endif %}
                </p>
                <p><strong>{{ job.role }}</strong> @ {{ job.company }}</p>
                <p class="is-size-7 has-text-grey-lighter">{{ job.location }}</p>
                <ul class="is-size-7 mt-2">
                  {% for point in job.description %}
                    <li>– {{ point }}</li>
                  {% endfor %}
                </ul>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>

    </div>
  </div>
</section>
