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