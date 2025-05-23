---
layout: default # Or your preferred page layout
title: Sitemap
permalink: /sitemap/ # Or /sitemap.html
seo:
  title: Sitemap - Comprehensive Overview of Our Content
  description: Explore all pages, blog posts, categories, and tags available on our site. A complete guide to our content.
---

<section class="section">
  <div class="container">
    <h1 class="title is-1 has-text-centered">Sitemap</h1>
    <p class="subtitle is-4 has-text-centered mb-6">
      Explore all the content available on our site.
    </p>
    <!-- Static Pages Section -->
    <div class="sitemap-section mb-6">
      <h2 class="title is-3 mb-4">Our Pages</h2>
      <div class="content">
        <ul class="sitemap-list">
          {%- assign sorted_pages = site.html_pages | sort: "title" -%}
          {%- for p in sorted_pages -%}
            {%- unless p.url == page.url or p.sitemap == false or p.url == "/" or p.url == "/404.html" or p.data.layout == "post" -%}
              <li><a href="{{ p.url | relative_url }}">{{ p.title | default: p.name | escape }}</a></li>
            {%- endunless -%}
          {%- endfor -%}
        </ul>
      </div>
    </div>
    <!-- Blog Posts Section -->
    <div class="sitemap-section mb-6">
      <h2 class="title is-3 mb-4">Latest Blog Posts</h2>
      {%- if site.posts.size > 0 -%}
        <div class="columns is-multiline is-desktop">
          {%- for post in site.posts limit:20 -%} {# Limit to recent posts or remove limit for all #}
            <div class="column is-one-quarter-desktop is-half-mobile">
              <div class="card sitemap-post-card">
                {%- if post.image -%}
                  <div class="card-image">
                    <figure class="image is-4by3">
                      <a href="{{ post.url | relative_url }}">
                        <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}">
                      </a>
                    </figure>
                  </div>
                {%- endif -%}
                <div class="card-content">
                  <p class="title is-5 card-post-title"><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></p>
                  <p class="subtitle is-7 has-text-grey">
                    <time datetime="{{ post.date | date_to_xmlschema }}">
                      {{ post.date | date: "%B %d, %Y" }}
                    </time>
                    {%- if post.categories.size > 0 -%}
                      • {{ post.categories | first | capitalize }}
                    {%- endif -%}
                  </p>
                </div>
              </div>
            </div>
          {%- endfor -%}
        </div>
        {%- if site.posts.size > 20 -%} {# Add link to full blog archive if limiting posts #}
          <div class="has-text-centered mt-4">
            <a href="{{ "/blog/" | relative_url }}" class="button is-link">View All Blog Posts</a> {# Adjust /blog/ if your blog index is elsewhere #}
          </div>
        {%- endif -%}
      {%- else -%}
        <p>No blog posts found.</p>
      {%- endif -%}
    </div>
    <!-- Categories Section -->
    {%- if site.categories.size > 0 -%}
    <div class="sitemap-section mb-6">
      <h2 class="title is-3 mb-4">Post Categories</h2>
      <div class="tags are-medium">
        {%- assign sorted_categories = site.categories | sort_natural -%}
        {%- for category_array in sorted_categories -%}
          {%- assign category_name = category_array[0] -%}
          {%- assign category_slug = category_name | slugify -%}
          {%- assign category_page_url = "/category/" | append: category_slug | append: "/" | relative_url -%}
          {# Adjust category_page_url if your category URL structure is different #}
          <a href="{{ category_page_url }}" class="tag is-info is-light">{{ category_name | capitalize }} ({{ category_array[1].size }})</a>
        {%- endfor -%}
      </div>
    </div>
    {%- endif -%}
    <!-- Tags Section (Optional) -->
    {%- if site.tags.size > 0 -%}
    <div class="sitemap-section">
      <h2 class="title is-3 mb-4">Post Tags</h2>
      <div class="tags are-medium">
        {%- assign sorted_tags = site.tags | sort_natural -%}
        {%- for tag_array in sorted_tags -%}
          {%- assign tag_name = tag_array[0] -%}
          {%- assign tag_slug = tag_name | slugify -%}
          {%- assign tag_page_url = "/tag/" | append: tag_slug | append: "/" | relative_url -%}
          {# Adjust tag_page_url if your tag URL structure is different #}
          <a href="{{ tag_page_url }}" class="tag is-success is-light">{{ tag_name }} ({{ tag_array[1].size }})</a>
        {%- endfor -%}
      </div>
    </div>
    {%- endif -%}

  </div>
</section>
<style>
// --- Sitemap Page Specific Styles ---
.sitemap-section {
  // General spacing is handled by Bulma's mb-6 on the section div itself
}
.sitemap-list {
  list-style: none; // Remove default bullet points
  margin-left: 0;
  padding-left: 0;

  li {
    padding: 0.3rem 0;
    border-bottom: 1px solid hsl(0, 0%, 93%); // Bulma's is-light border color

    &:last-child {
      border-bottom: none;
    }

    a {
      font-size: 1.1rem;
      color: hsl(217, 71%, 53%); // Bulma's link color
      &:hover {
        color: hsl(217, 71%, 48%); // Darker on hover
        text-decoration: underline;
      }
    }
  }
}

.sitemap-post-card {
  height: 100%; // Makes cards in a row the same height
  display: flex;
  flex-direction: column;

  .card-image {
    img {
      object-fit: cover; // Ensures image covers the area without distortion
    }
  }

  .card-content {
    flex-grow: 1; // Allows content to expand and push footer down if present
    padding: 1rem; // Slightly reduced padding for a tighter look
  }

  .card-post-title {
    margin-bottom: 0.5rem !important; // Override Bulma if needed
    line-height: 1.3;
    a {
      color: hsl(0, 0%, 21%); // Bulma's title color
      &:hover {
        color: hsl(217, 71%, 53%);
      }
    }
  }
  .subtitle.is-7 {
    font-size: 0.8rem;
  }
}

// Optional: Add some hover effect to cards
.sitemap-post-card:hover {
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02);
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}

.tags.are-medium .tag {
  margin: 0.25rem; // Ensure good spacing between tags
}</style>