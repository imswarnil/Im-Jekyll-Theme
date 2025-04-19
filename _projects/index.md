---
layout: default
title: My Projects
description: A collection of projects I've worked on.
permalink: /projects/ # Ensures this page lives at /projects/
---
<section class="section projects-listing-page">
      <div class="container">
        <h1 class="title is-size-1 has-text-centered mb-6">My Projects</h1>
        <p class="subtitle is-size-5 has-text-centered has-text-grey mb-6">
          Here's a selection of projects I've developed or contributed to.
        </p>
        <div class="columns is-multiline is-centered project-grid">
          {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
          {% for p in sorted_projects %}
          <div class="column is-4-desktop is-6-tablet">
            <div class="card project-card">
              {% if p.image %}
              <div class="card-image">
                <figure class="image is-4by3">
                  <a href="{{ p.url | relative_url }}" title="{{ p.title }}">
                    <img src="{{ p.image | relative_url }}" alt="{{ p.title }}">
                  </a>
                </figure>
              </div>
              {% endif %}
              <div class="card-content">
                <div class="content">
                   <h3 class="title is-size-4 mb-2">
                     <a href="{{ p.url | relative_url }}" title="{{ p.title }}">{{ p.title }}</a>
                   </h3>
                   {% if p.date %}
                   <p class="is-size-7 has-text-grey mb-2">
                     {{ p.date | date: "%B %Y" }}
                     {% if p.status %} | <span class="tag is-info is-light is-small">{{ p.status }}</span>{% endif %}
                   </p>
                   {% endif %}
                  <p class="is-size-6 project-card-description">{{ p.description | strip_html | truncatewords: 20 }}</p>
                  {% if p.tags and p.tags.size > 0 %}
                  <div class="tags are-small mt-3">
                    {% for tag in p.tags limit: 4 %} {# Show limited tags on card #}
                      <span class="tag is-primary is-light">{{ tag }}</span>
                    {% endfor %}
                  </div>
                  {% endif %}
                </div>
              </div>
               {% if p.repo_url or p.live_url %}
               <footer class="card-footer">
                  {% if p.repo_url %}
                  <a href="{{ p.repo_url }}" class="card-footer-item" target="_blank" rel="noopener noreferrer">
                      <span class="icon is-small"><i class="fab fa-github"></i></span> Repo
                  </a>
                  {% endif %}
                  {% if p.live_url %}
                   <a href="{{ p.live_url }}" class="card-footer-item" target="_blank" rel="noopener noreferrer">
                       <span class="icon is-small"><i class="fas fa-external-link-alt"></i></span> Live
                   </a>
                  {% endif %}
               </footer>
              {% endif %}
            </div>
          </div>
          {% endfor %}
        </div>
      </div>
    </section>