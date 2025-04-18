---
title: Archive
description: "Complete Timeline of All Content"
layout: page
---

<section class="section">
  <div class="container">
    <div class="columns is-desktop">
      <!-- Sidebar Column -->
      <div class="column is-one-quarter">
        <div class="box sticky-sidebar">
          <h2 class="title is-4 mb-4">Filter Archive</h2>
          <!-- Year Filter -->
          <div class="mb-5">
            <h3 class="subtitle is-5 mb-3">By Year</h3>
            <div class="tags">
              {% assign all_years = site.documents | group_by_exp: "doc", "doc.date | date: '%Y'" %}
              {% for year in all_years %}
                <a href="#year-{{ year.name }}" class="tag is-medium is-rounded mb-1">{{ year.name }}</a>
              {% endfor %}
            </div>
          </div>
          <!-- Collection Filter -->
          <div class="mb-5">
            <h3 class="subtitle is-5 mb-3">By Collection</h3>
            <div class="buttons are-small">
              {% assign collections = site.collections | where_exp:"col", "col.label != 'posts'" %}
              <a href="#" class="button is-fullwidth is-light" data-filter="all">All Content</a>
              <a href="#" class="button is-fullwidth is-light" data-filter="posts">Posts</a>
              {% for collection in collections %}
                <a href="#" class="button is-fullwidth is-light" data-filter="{{ collection.label }}">{{ collection.label | capitalize }}</a>
              {% endfor %}
            </div>
          </div>
          <!-- Search Box -->
          <div class="mb-5">
            <h3 class="subtitle is-5 mb-3">Search Archive</h3>
            <div class="field">
              <div class="control has-icons-left">
                <input class="input" type="text" placeholder="Search archive..." id="archive-search">
                <span class="icon is-left">
                  <i class="fas fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Main Content Column -->
      <div class="column">
        <h1 class="title is-2 mb-6">Complete Archive</h1>
        {% assign all_docs = site.documents | sort: 'date' | reverse %}
        {% assign docs_by_year = all_docs | group_by_exp: "doc", "doc.date | date: '%Y'" %}
        {% for year in docs_by_year %}
        <div class="archive-year" id="year-{{ year.name }}">
          <div class="year-header">
            <h2 class="title is-3">{{ year.name }}</h2>
            <hr class="year-divider">
          </div>
          {% assign docs_by_month = year.items | group_by_exp: "doc", "doc.date | date: '%B'" %}
          {% for month in docs_by_month %}
          <div class="archive-month">
            <h3 class="subtitle is-4">{{ month.name }}</h3>
            <div class="archive-items">
              {% for doc in month.items %}
              <article class="archive-item box" data-collection="{{ doc.collection }}" data-year="{{ year.name }}" data-month="{{ month.name }}">
                <div class="media">
                  {% if doc.image %}
                  <figure class="media-left">
                    <p class="image is-128x128">
                      <img src="{{ doc.image | relative_url }}" alt="{{ doc.title }}" class="archive-image" loading="lazy">
                    </p>
                  </figure>
                  {% endif %}
                  <div class="media-content">
                    <div class="content">
                      <p class="is-size-5 has-text-weight-semibold mb-2">
                        <a href="{{ doc.url | relative_url }}" class="has-text-dark">{{ doc.title }}</a>
                        <span class="tag is-info is-light ml-2">{{ doc.collection | capitalize }}</span>
                      </p>
                      <p class="is-size-6 mb-3">{{ doc.description | default: doc.excerpt | strip_html | truncate: 200 }}</p>
                      <div class="level is-mobile">
                        <div class="level-left">
                          <div class="level-item">
                            <span class="icon-text">
                              <span class="icon">
                                <i class="far fa-calendar-alt"></i>
                              </span>
                              <span>{{ doc.date | date: "%b %d, %Y" }}</span>
                            </span>
                          </div>
                          {% if doc.author %}
                          <div class="level-item">
                            <span class="icon-text">
                              <span class="icon">
                                <i class="far fa-user"></i>
                              </span>
                              <span>{{ doc.author }}</span>
                            </span>
                          </div>
                          {% endif %}
                        </div>
                        <div class="level-right">
                          <a href="{{ doc.url | relative_url }}" class="button is-small is-link is-outlined">Read More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              {% endfor %}
            </div>
          </div>
          {% endfor %}
        </div>
        {% endfor %}
      </div>
    </div>
  </div>
</section>

<style>
/* Layout Styles */
.sticky-sidebar {
  position: sticky;
  top: 2rem;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
}

.archive-year {
  margin-bottom: 3rem;
}

.year-header {
  margin-bottom: 2rem;
}

.year-divider {
  height: 2px;
  background: linear-gradient(to right, $primary , transparent);
  border: none;
  margin: 0.5rem 0 1.5rem;
}

.archive-month {
  margin-bottom: 2.5rem;
}

.archive-items {
  margin-left: 1rem;
}

.archive-item {
  margin-bottom: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-left: 3px solid #00d1b2;
}

.archive-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.archive-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
}

/* Typography */
.title.is-2 {
  font-size: 2.5rem;
}

.title.is-3 {
  font-size: 2rem;
}

.subtitle.is-4 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem !important;
  padding-left: 1rem;
  border-left: 3px solid $primary;
}

.is-size-5 {
  font-size: 1.25rem !important;
}

.is-size-6 {
  font-size: 1rem !important;
}

/* Responsive Adjustments */
@media screen and (max-width: 768px) {
  .archive-item .media {
    flex-direction: column;
  }
  
  .archive-item .media-left {
    margin-bottom: 1rem;
    margin-right: 0;
  }
  
  .archive-item .image.is-128x128 {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
  
  .sticky-sidebar {
    position: static;
    max-height: none;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Collection filter
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const filterValue = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('is-primary'));
      this.classList.add('is-primary');
      
      // Filter items
      const allItems = document.querySelectorAll('.archive-item');
      allItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = '';
        } else {
          if (item.getAttribute('data-collection') === filterValue) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
  
  // Year navigation
  const yearLinks = document.querySelectorAll('.tags a');
  yearLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetYear = this.getAttribute('href').substring(1);
      document.getElementById(targetYear).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Archive search
  const searchInput = document.getElementById('archive-search');
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const items = document.querySelectorAll('.archive-item');
    
    items.forEach(item => {
      const title = item.querySelector('.media-content .content a').textContent.toLowerCase();
      const description = item.querySelector('.media-content .content p.is-size-6').textContent.toLowerCase();
      
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
</script>