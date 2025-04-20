---
layout: default
title: Projects Portfolio
description: "A showcase of web development, open source, and data visualization projects by Swarnil."
permalink: /projects # Explicitly set the URL
---
<section class="section project-listing-page">
  <div class="container">
    <div class="project-listing-header has-text-centered mb-6">
      <h1 class="title is-size-1 has-text-weight-bold">My Projects</h1>
      <p class="subtitle is-size-5 has-text-grey">
        Exploring web technologies through practical application.
      </p>
    </div>
    <div class="columns is-multiline is-variable is-4-tablet is-5-desktop project-grid">
      {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
      {% for p in sorted_projects %}
      <div class="column is-6-tablet is-4-desktop project-column">
        {% comment %} --- Start Reusable Project Card --- {% endcomment %}
        {% include card/project.html project=p %}
        {% comment %} --- End Reusable Project Card --- {% endcomment %}
      </div>
      {% endfor %}
    </div>
  </div>
</section>