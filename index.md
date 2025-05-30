---
title: Im Jekyll Theme
description: "An open-source Jekyll theme crafted using the Bulma CSS framework. This theme utilizes Bulma SCSS, making it incredibly easy to customize and adapt to your specific needs. With over 7 layouts and 10+ collections"
image: /assets/logos/logo.svg
layout: default
---

{% comment %}
  Displays the work experience section using Bulma CSS.
  Assumes `site.work_experience` data is available from _config.yml
{% endcomment %}

{% if site.work_experience.enabled and site.work_experience.jobs.size > 0 %}
<section id="work-experience" class="section">
  <div class="container">
    <h2 class="title is-2 has-text-centered mb-6">
      {{ site.work_experience.section_title | default: "Professional Journey" }}
    </h2>

    {% for job in site.work_experience.jobs %}
      <div class="block"> {% comment %} Adds some space between job entries {% endcomment %}
        <div class="media">
          {% if job.company_logo %}
            <figure class="media-left is-hidden-mobile"> {% comment %} Hide logo on mobile for better flow if desired {% endcomment %}
              <p class="image is-96x96"> {% comment %} Adjust size: is-48x48, is-64x64, is-96x96, is-128x128 {% endcomment %}
                <img src="{{ job.company_logo | relative_url }}" alt="{{ job.company }} logo" style="object-fit: contain; border-radius: 8px;">
              </p>
            </figure>
          {% endif %}
          <div class="media-content">
            <div class="content">
              <div class="level is-mobile mb-1">
                <div class="level-left">
                  <h3 class="title is-4 mb-0">
                    {{ job.role }}
                  </h3>
                </div>
              </div>

              <div class="level is-mobile">
                <div class="level-left">
                    <p class="subtitle is-5">
                      {% if job.company_url %}
                        <a href="{{ job.company_url }}" target="_blank" rel="noopener noreferrer" class="has-text-link">
                          {{ job.company }}
                        </a>
                      {% else %}
                        {{ job.company }}
                      {% endif %}
                    </p>
                </div>
                <div class="level-right is-size-7 has-text-grey">
                   {{ job.start_date | date: "%b %Y" }} –
                    {% if job.current %}
                      Present
                    {% else %}
                      {{ job.end_date | date: "%b %Y" }}
                    {% endif %}
                    {% if job.duration %}
                       ({{ job.duration }})
                    {% endif %}
                </div>
              </div>


              {% if job.previous_role %}
                <p class="is-size-7 has-text-grey-dark mb-1"><em>Previously: {{ job.previous_role }}</em></p>
              {% endif %}
              <p class="is-size-7 has-text-grey-dark mb-3">
                <span class="icon-text">
                  <span class="icon"><i class="fas fa-map-marker-alt"></i></span>
                  <span>{{ job.location }}</span>
                </span>
              </p>

              {% if job.description and job.description.size > 0 %}
                <ul class="job-description-list mb-4">
                  {% for item in job.description %}
                    <li>{{ item }}</li>
                  {% endfor %}
                </ul>
              {% endif %}

              {% if job.technologies_used and job.technologies_used.size > 0 %}
                <div class="tags are-medium"> {% comment %} or are-small {% endcomment %}
                  {% for tech in job.technologies_used %}
                    <span class="tag is-light is-rounded">{{ tech }}</span>
                  {% endfor %}
                </div>
              {% endif %}
            </div>
          </div>
        </div>
      </div>
      {% unless forloop.last %}
        <hr class="is-hidden-mobile"> {% comment %} Optional separator between jobs, hidden on mobile if too cluttered {% endcomment %}
      {% endunless %}
    {% endfor %}
  </div>
</section>
{% endif %}

{% comment %}
  Add this to your <head> if you are using Font Awesome icons:
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  Adjust the version as needed.
{% endcomment %}

<style>
  /* Optional custom styles to enhance the look */
  .job-description-list {
    list-style-type: disc; /* Or your preferred list style */
    padding-left: 20px; /* Indent list items */
    margin-top: 0.75rem;
  }
  .job-description-list li {
    margin-bottom: 0.5em;
  }
  .media-left.is-hidden-mobile {
      margin-right: 1.5rem; /* Ensure some space when logo is visible */
  }
  .block:not(:last-child) {
    margin-bottom: 2.5rem; /* More distinct separation between job blocks */
  }
  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>