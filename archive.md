---
title: Archive
description: "Complete Timeline of All Content"
layout: page
---

<section class="section">
  <div class="container">
    <h1 class="title is-1 has-text-centered mb-6">Complete Archive</h1>
    
    {% comment %} Get all documents from all collections sorted by date {% endcomment %}
    {% assign all_docs = site.documents | sort: 'date' | reverse %}
    {% assign docs_by_year = all_docs | group_by_exp: "doc", "doc.date | date: '%Y'" %}
    
    <div class="timeline is-centered">
      {% for year in docs_by_year %}
      <div class="timeline-header">
        <span class="tag is-primary is-large">{{ year.name }}</span>
      </div>
      
      {% assign docs_by_month = year.items | group_by_exp: "doc", "doc.date | date: '%B'" %}
      {% for month in docs_by_month %}
      <div class="timeline-item">
        <div class="timeline-marker is-icon">
          <i class="fas fa-calendar-alt"></i>
        </div>
        <div class="timeline-content">
          <div class="box">
            <p class="heading is-size-5 has-text-weight-bold">{{ month.name }} {{ year.name }}</p>
            <div class="content">
              <div class="timeline-posts">
                {% for doc in month.items %}
                <article class="media timeline-post">
                  {% if doc.image %}
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img src="{{ doc.image | relative_url }}" alt="{{ doc.title }}" class="is-rounded" loading="lazy">
                    </p>
                  </figure>
                  {% endif %}
                  <div class="media-content">
                    <div class="content">
                      <p class="is-size-6">
                        <a href="{{ doc.url | relative_url }}" class="has-text-weight-semibold">
                          {% if doc.collection != "posts" %}
                            <span class="tag is-info is-light">{{ doc.collection | capitalize }}</span>
                          {% endif %}
                          {{ doc.title }}
                        </a>
                        <br>
                        <small class="has-text-grey">
                          <i class="far fa-calendar-alt"></i> {{ doc.date | date: "%b %-d" }}
                          {% if doc.author %}
                            &middot; <i class="far fa-user"></i> {{ doc.author }}
                          {% endif %}
                        </small>
                      </p>
                    </div>
                  </div>
                </article>
                {% endfor %}
              </div>
            </div>
          </div>
        </div>
      </div>
      {% endfor %}
      {% endfor %}
    </div>
  </div>
</section>

<style>
/* Timeline Styles */
.timeline {
  margin: 3em auto;
  max-width: 900px;
  position: relative;
  padding-left: 3em;
  border-left: 3px solid #00d1b2;
}

.timeline-header {
  margin-bottom: 2em;
  margin-left: -3.5em;
  display: flex;
  justify-content: flex-start;
}

.timeline-item {
  position: relative;
  padding-bottom: 2em;
  margin-bottom: 1em;
}

.timeline-marker {
  position: absolute;
  background: #00d1b2;
  border: 3px solid white;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  left: -3.75em;
  top: 0.25em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 0 0 3px #00d1b2;
}

.timeline-marker.is-icon {
  background: white;
  color: #00d1b2;
  font-size: 0.8em;
}

.timeline-content {
  padding-left: 1.5em;
  transition: transform 0.2s ease;
}

.timeline-content:hover {
  transform: translateX(5px);
}

.timeline-content .box {
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
  transition: box-shadow 0.3s ease;
}

.timeline-content .box:hover {
  box-shadow: 0 5px 15px rgba(10, 10, 10, 0.1);
}

.timeline-posts {
  margin-top: 1em;
}

.timeline-post {
  padding: 1em 0;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s ease;
}

.timeline-post:last-child {
  border-bottom: none;
}

.timeline-post:hover {
  background: #f9f9f9;
}

.timeline-post .media-left img {
  object-fit: cover;
}

@media screen and (max-width: 768px) {
  .timeline {
    padding-left: 2em;
    border-width: 2px;
  }
  
  .timeline-header {
    margin-left: -2.75em;
  }
  
  .timeline-marker {
    width: 1.2em;
    height: 1.2em;
    left: -2.9em;
  }
  
  .timeline-content {
    padding-left: 1em;
  }
}
</style>