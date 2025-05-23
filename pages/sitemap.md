---
layout: default
title: Sitemap
permalink: /site/
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
          {%- for post in site.posts limit:20 -%}
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
                    {%- if post.categories.size > 0 and post.categories.first != "" and post.categories.first != nil -%}
                      • {{ post.categories.first | capitalize }}
                    {%- endif -%}
                  </p>
                </div>
              </div>
            </div>
          {%- endfor -%}
        </div>
        {%- if site.posts.size > 20 -%}
          <div class="has-text-centered mt-4">
            <a href="{{ "/blog/" | relative_url }}" class="button is-link">View All Blog Posts</a>
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
          {%- assign category_name_raw = category_array[0] -%}
          {%- if category_name_raw and category_name_raw != "" -%}
            {%- comment -%} Ensure category_name_raw is a string; default to empty if not for safety, though it should be. {%- endcomment -%}
            {%- assign category_name = category_name_raw | default: "" | strip -%}
            {%- if category_name != "" -%}
              {%- assign category_slug = category_name | slugify -%}
              {%- assign category_page_url = "/category/" | append: category_slug | append: "/" | relative_url -%}
              <a href="{{ category_page_url }}" class="tag is-info is-light">{{ category_name | capitalize }} ({{ category_array[1].size }})</a>
            {%- endif -%}
          {%- endif -%}
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
          {%- assign tag_name_raw = tag_array[0] -%}
          {%- if tag_name_raw and tag_name_raw != "" -%}
            {%- comment -%} Ensure tag_name_raw is a string {%- endcomment -%}
            {%- assign tag_name = tag_name_raw | default: "" | strip -%}
            {%- if tag_name != "" -%}
              {%- assign tag_slug = tag_name | slugify -%}
              {%- assign tag_page_url = "/tag/" | append: tag_slug | append: "/" | relative_url -%}
              <a href="{{ tag_page_url }}" class="tag is-success is-light">{{ tag_name }} ({{ tag_array[1].size }})</a>
            {%- endif -%}
          {%- endif -%}
        {%- endfor -%}
      </div>
    </div>
    {%- endif -%}

  </div>
</section>