---
title: archive
description: "All Archive"
layout : page
---
<section class="section">
  <div class="container">
    <h1 class="title">Complete Archive</h1>
    {% comment %} Get all documents from all collections {% endcomment %}
    {% assign all_docs = site.documents | sort: 'date' | reverse %}
    {% assign docs_by_year = all_docs | group_by_exp: "doc", "doc.date | date: '%Y'" %}
    <div class="timeline">
      {% for year in docs_by_year %}
      <div class="timeline-header">
        <span class="tag is-primary is-medium">{{ year.name }}</span>
      </div>
      {% assign docs_by_month = year.items | group_by_exp: "doc", "doc.date | date: '%B'" %}
      {% for month in docs_by_month %}
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <p class="heading">{{ month.name }}</p>
          <div class="content">
            <ul>
              {% for doc in month.items %}
              <li>
                <a href="{{ doc.url }}">
                  {% if doc.collection != "posts" %}
                    [{{ doc.collection | capitalize }}] 
                  {% endif %}
                  {{ doc.title }}
                </a>
                <span class="is-size-7 has-text-grey">- {{ doc.date | date: "%b %-d" }}</span>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
      </div>
      {% endfor %}
      {% endfor %}
    </div>
  </div>
</section>
<style>
    .timeline {
  margin-left: 1em;
  padding-left: 1.5em;
  border-left: 2px solid $primary;
     .timeline-header {
    margin-bottom: 1.5em;
    margin-left: -2.35em;
  }
  .timeline-item {
    position: relative;
    padding-bottom: 1.5em;
    .timeline-marker {
      position: absolute;
      background: $primary;
      border-radius: 50%;
      width: 1em;
      height: 1em;
      left: -2.35em;
      top: 0.25em;
    }
    .timeline-content {
      padding-left: 1em;
      .heading {
        font-weight: bold;
        margin-bottom: 0.5em;
      }
    }
    &:last-child {
      padding-bottom: 0;
    }
  }
} </style>
