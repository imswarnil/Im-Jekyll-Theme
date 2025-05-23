---
layout: default
title: Site Overview
permalink: /site/ # New permalink
seo:
  title: Site Overview & Sitemap - A Holistic View of Our Content
  description: Discover everything on our site! Explore pages, blog posts, topics (categories), and keywords (tags) in a visually organized manner.
---

<section class="section sitemap-page">
  <div class="container">
    <div class="has-text-centered mb-6">
      <span class="icon is-large has-text-primary">
        <i class="ph-bold ph-compass ph-3x"></i>
      </span>
      <h1 class="title is-1 mt-2">Site Overview</h1>
      <p class="subtitle is-4">
        Your guide to all the content, topics, and resources available here.
      </p>
    </div>
    <!-- Section for Key Pages (could be manually defined or smart-filtered) -->
    <div class="sitemap-section key-pages-section mb-6">
      <h2 class="title is-3 has-text-weight-semibold">
        <span class="icon-text">
          <span class="icon"><i class="ph ph-star"></i></span>
          <span>Key Destinations</span>
        </span>
      </h2>
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <a href="{{ "/" | relative_url }}" class="tile is-child box has-background-primary-light has-text-primary-dark sitemap-tile-link">
            <p class="title is-5"><span class="icon"><i class="ph ph-house"></i></span> Homepage</p>
            <p class="subtitle is-6">Start your journey here.</p>
          </a>
        </div>
        {%- assign about_page = site.pages | where_exp: "item", "item.url == '/about/'" | first -%}
        {%- if about_page -%}
        <div class="tile is-parent">
          <a href="{{ about_page.url | relative_url }}" class="tile is-child box has-background-info-light has-text-info-dark sitemap-tile-link">
            <p class="title is-5"><span class="icon"><i class="ph ph-users"></i></span> {{ about_page.title | default: "About Us" }}</p>
            <p class="subtitle is-6">Learn more about us.</p>
          </a>
        </div>
        {%- endif -%}
        {%- assign blog_page = site.pages | where_exp: "item", "item.url == '/blog/'" | first -%}
        {%- if blog_page -%}
        <div class="tile is-parent">
          <a href="{{ blog_page.url | relative_url }}" class="tile is-child box has-background-link-light has-text-link-dark sitemap-tile-link">
            <p class="title is-5"><span class="icon"><i class="ph ph-article"></i></span> {{ blog_page.title | default: "Blog" }}</p>
            <p class="subtitle is-6">Read our latest articles.</p>
          </a>
        </div>
        {%- else -%}
         <div class="tile is-parent">
          <a href="/#latest-posts-anchor" class="tile is-child box has-background-link-light has-text-link-dark sitemap-tile-link"> {# Fallback if no /blog/ page #}
            <p class="title is-5"><span class="icon"><i class="ph ph-article"></i></span> Latest Articles</p>
            <p class="subtitle is-6">Catch up on our posts.</p>
          </a>
        </div>
        {%- endif -%}
        {%- assign contact_page = site.pages | where_exp: "item", "item.url == '/contact/'" | first -%}
        {%- if contact_page -%}
        <div class="tile is-parent">
          <a href="{{ contact_page.url | relative_url }}" class="tile is-child box has-background-warning-light has-text-warning-dark sitemap-tile-link">
            <p class="title is-5"><span class="icon"><i class="ph ph-chats-circle"></i></span> {{ contact_page.title | default: "Contact" }}</p>
            <p class="subtitle is-6">Get in touch with us.</p>
          </a>
        </div>
        {%- endif -%}
      </div>
    </div>
    <!-- Blog Posts Section -->
    <div class="sitemap-section posts-section mb-6" id="latest-posts-anchor">
      <h2 class="title is-3 has-text-weight-semibold">
        <span class="icon-text">
          <span class="icon"><i class="ph ph-notebook"></i></span>
          <span>Recent Articles</span>
        </span>
      </h2>
      {%- if site.posts.size > 0 -%}
        <div class="columns is-multiline is-desktop">
          {%- for post in site.posts limit:8 -%}
            <div class="column is-one-quarter-desktop is-half-mobile">
              <div class="card sitemap-post-card raise-on-hover">
                {%- if post.image -%}
                  <a href="{{ post.url | relative_url }}" aria-label="Read more about {{ post.title | escape }}">
                    <div class="card-image">
                      <figure class="image is-16by9">
                        <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
                      </figure>
                    </div>
                  </a>
                {%- endif -%}
                <div class="card-content">
                  <div class="content">
                    <p class="title is-5 mb-1 card-post-title"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></p>
                    <p class="subtitle is-7 has-text-grey mb-2">
                      <time datetime="{{ post.date | date_to_xmlschema }}">
                        <span class="icon is-small"><i class="ph ph-calendar-blank"></i></span>
                        {{ post.date | date: "%b %d, %Y" }}
                      </time>
                    </p>
                    {%- if post.excerpt -%}
                      <p class="is-size-7 post-excerpt">{{ post.excerpt | strip_html | truncatewords: 15 }}</p>
                    {%- endif -%}
                  </div>
                </div>
                <footer class="card-footer">
                  {%- if post.categories.size > 0 -%}
                    {%- assign first_category = post.categories | first | default: "" | strip -%}
                    {%- if first_category != "" -%}
                      {%- assign cat_slug = first_category | slugify -%}
                      {%- assign cat_url = "/category/" | append: cat_slug | append: "/" | relative_url -%}
                      <a href="{{ cat_url }}" class="card-footer-item is-size-7">
                        <span class="icon is-small"><i class="ph ph-tag"></i></span>{{ first_category | capitalize }}
                      </a>
                    {%- endif -%}
                  {%- endif -%}
                   <a href="{{ post.url | relative_url }}" class="card-footer-item is-size-7 has-text-link">
                     Read More <span class="icon is-small"><i class="ph ph-arrow-right"></i></span>
                   </a>
                </footer>
              </div>
            </div>
          {%- endfor -%}
        </div>
        {%- if site.posts.size > 8 or site.pages | where_exp: "item", "item.url == '/blog/'" | size > 0 -%}
          <div class="has-text-centered mt-5">
            <a href="{{ (site.pages | where_exp: "item", "item.url == '/blog/'" | first).url | default: "/#latest-posts-anchor" | relative_url }}" class="button is-primary is-outlined is-rounded">
              <span class="icon"><i class="ph ph-books"></i></span>
              <span>View All Articles</span>
            </a>
          </div>
        {%- endif -%}
      {%- else -%}
        <div class="notification is-warning">No blog posts found yet. Stay tuned!</div>
      {%- endif -%}
    </div>
    <!-- Topics (Categories) Section -->
    {%- if site.categories.size > 0 -%}
    <div class="sitemap-section topics-section mb-6">
      <h2 class="title is-3 has-text-weight-semibold">
        <span class="icon-text">
          <span class="icon"><i class="ph ph-folders"></i></span>
          <span>Explore by Topic</span>
        </span>
      </h2>
      <div class="tile is-ancestor is-flex-wrap-wrap"> {# is-flex-wrap-wrap for tiles to wrap #}
        {%- assign sorted_categories = site.categories | sort_natural -%}
        {%- for category_item in sorted_categories -%}
          {%- assign category_name = category_item[0] -%}
          {%- assign category_posts_count = category_item[1].size -%}
          {%- if category_name and category_name != "" -%}
            {%- assign category_slug = category_name | slugify -%}
            {%- assign category_page_url = "/category/" | append: category_slug | append: "/" | relative_url -%}
            <div class="tile is-parent is-4"> {# Adjust is-4 for number of columns (3 per row) #}
              <a href="{{ category_page_url }}" class="tile is-child box sitemap-tile-link topic-tile raise-on-hover">
                <article class="media">
                  <div class="media-left">
                    <span class="icon is-large has-text-info">
                      <i class="ph ph-folder-simple-dashed ph-2x"></i>
                    </span>
                  </div>
                  <div class="media-content">
                    <p class="title is-5">{{ category_name | capitalize }}</p>
                    <p class="subtitle is-6">{{ category_posts_count }} Article{% if category_posts_count != 1 %}s{% endif %}</p>
                  </div>
                </article>
              </a>
            </div>
          {%- endif -%}
        {%- endfor -%}
      </div>
    </div>
    {%- endif -%}
    <!-- Keywords (Tags) Section -->
    {%- if site.tags.size > 0 -%}
    <div class="sitemap-section tags-section mb-6">
      <h2 class="title is-3 has-text-weight-semibold">
        <span class="icon-text">
          <span class="icon"><i class="ph ph-tags"></i></span>
          <span>Browse by Keyword</span>
        </span>
      </h2>
      <div class="tags are-medium"> {# Simpler tag cloud style #}
        {%- assign sorted_tags = site.tags | sort_natural -%}
        {%- for tag_item in sorted_tags -%}
          {%- assign tag_name = tag_item[0] -%}
          {%- assign tag_posts_count = tag_item[1].size -%}
          {%- if tag_name and tag_name != "" -%}
            {%- assign tag_slug = tag_name | slugify -%}
            {%- assign tag_page_url = "/tag/" | append: tag_slug | append: "/" | relative_url -%}
            <a href="{{ tag_page_url }}" class="tag is-light is-rounded sitemap-tag-link">
              <span class="icon is-small"><i class="ph ph-tag"></i></span>
              {{ tag_name }} ({{ tag_posts_count }})
            </a>
          {%- endif -%}
        {%- endfor -%}
      </div>
    </div>
    {%- endif -%}
    <!-- All Other Pages Section -->
    <div class="sitemap-section other-pages-section">
      <h2 class="title is-3 has-text-weight-semibold">
        <span class="icon-text">
          <span class="icon"><i class="ph ph-files"></i></span>
          <span>Other Site Pages</span>
        </span>
      </h2>
      <div class="content">
        <ul class="sitemap-list columns is-multiline">
          {%- assign excluded_urls = "/,/sitemap/,/site/,/about/,/contact/,/blog/,/404.html" | split: ',' -%}
          {%- assign regular_pages = site.html_pages | where_exp: "item", "item.layout != 'post'" -%}
          {%- for p in regular_pages sort: "title" -%}
            {%- unless excluded_urls contains p.url or p.sitemap == false -%}
              <li class="column is-one-third-desktop is-half-tablet">
                <a href="{{ p.url | relative_url }}">
                  <span class="icon is-small"><i class="ph ph-file-text"></i></span>
                  {{ p.title | default: p.name | escape }}
                </a>
              </li>
            {%- endunless -%}
          {%- endfor -%}
        </ul>
      </div>
    </div>
  </div>
</section>

<style>
    // assets/css/style.scss or similar

// --- Sitemap Page General Styles ---
.sitemap-page {
  background-color: hsl(0, 0%, 98%); // Very light grey background for the whole page

  .title.is-1 {
    color: hsl(0, 0%, 21%); // Bulma's default title color
  }
  .subtitle.is-4 {
    color: hsl(0, 0%, 48%); // Bulma's default subtitle color
  }

  .sitemap-section {
    background-color: #fff;
    padding: 2rem 2.5rem;
    border-radius: 8px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,0.05), 0 0 0 1px rgba(10,10,10,0.02);

    .title.is-3 {
      border-bottom: 2px solid hsl(204, 86%, 53%); // Bulma primary color
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem !important;
      .icon {
        margin-right: 0.5rem;
        color: hsl(204, 86%, 53%);
      }
    }
  }
}

// --- Key Destinations Tiles ---
.key-pages-section .tile.is-child {
  padding: 1.5rem;
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  }
  .title .icon { margin-right: 0.5em; }
}

// --- Post Cards Enhanced ---
.sitemap-post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid hsl(0, 0%, 86%); // Softer border
  border-radius: 6px;
  overflow: hidden; // Important for child border-radius and image fit
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &.raise-on-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.05);
  }

  .card-image {
    border-bottom: 1px solid hsl(0, 0%, 93%);
    img {
      object-fit: cover;
      height: 100%; // Ensure image tries to fill its figure container
      width: 100%;
    }
  }

  .card-content {
    flex-grow: 1;
    padding: 1rem;
    .content { margin-bottom: 0;} // Remove extra margin from Bulma's .content
    .card-post-title a {
      color: hsl(0, 0%, 29%);
      &:hover { color: hsl(217, 71%, 53%); }
    }
    .post-excerpt {
      color: hsl(0, 0%, 48%);
      line-height: 1.5;
    }
  }

  .card-footer {
    background-color: hsl(0, 0%, 98%);
    border-top: 1px solid hsl(0, 0%, 93%);
    a.card-footer-item {
      color: hsl(0, 0%, 48%);
      font-weight: 500;
      transition: color 0.2s ease;
      &:hover {
        background-color: hsl(0, 0%, 96%);
        color: hsl(217, 71%, 53%);
      }
      .icon { margin-right: 0.3em; }
    }
  }
}


// --- Topic Tiles (Categories) ---
.topic-tile {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
  border-left: 4px solid transparent; // Placeholder for hover effect
  .media-left .icon {
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 5px 12px rgba(0,0,0,0.08);
    border-left-color: hsl(171, 100%, 41%); // Bulma success color
    .media-left .icon {
      transform: rotate(-5deg) scale(1.1);
    }
  }
  .title { color: hsl(0,0%,29%); }
  .subtitle { color: hsl(0,0%,48%); }
}

// --- Tag Cloud (Tags) ---
.tags-section .tags .tag {
  padding: 0.5em 1em;
  font-size: 0.9rem;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
  &:hover {
    background-color: hsl(141, 53%, 53%) !important; // Bulma success (stronger)
    color: white !important;
    transform: scale(1.05);
  }
  .icon { margin-right: 0.3em; }
}

// --- Other Pages List ---
.other-pages-section .sitemap-list {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
  li a {
    display: inline-flex; // For icon alignment
    align-items: center;
    padding: 0.4em 0;
    font-size: 1rem;
    color: hsl(217, 71%, 53%);
    transition: color 0.2s ease;
    .icon { margin-right: 0.5em; color: hsl(217, 71%, 65%);}
    &:hover {
      color: hsl(217, 71%, 48%);
      text-decoration: underline;
      .icon {color: hsl(217, 71%, 48%);}
    }
  }
}

// Helper for icon usage in titles etc.
.icon-text .icon {
  vertical-align: middle;
}

// General link styling for sitemap tiles
a.sitemap-tile-link {
  display: block; // Make the whole tile clickable
  text-decoration: none !important; // Remove underline from tile links
  p.title, p.subtitle {
    transition: color 0.2s ease;
  }
  &:hover {
    p.title { color: hsl(217, 71%, 48%) !important; } // Adjust hover color if needed
  }
}
    </style>