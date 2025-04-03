---
layout: video
title: All Videos
collection : videos
permalink: /videos
---
    <main class="im-video-page">
    {% include utility/breadcrumb.html %} 
<section class="section">
        <div class="container">
            <a href="/" class="button is-light is-small mb-6">
            <i class="fas fa-arrow-left mr-2"></i> Back to Home1
        </a>      
            <div class="im-video-header mb-6">
                <h1 class="title is-1">Videos</h1>
                <p class="subtitle is-4">Tutorials, reviews, vlogs, and more</p>
            </div>
            <div class="columns">
                <div class="column is-9">
                    <div class="im-video-search mb-5">
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input class="input" type="text" placeholder="Search videos..." value="">
                        </div>
                        <div class="control">
                            <button class="button is-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>              
                {% assign categories = "" | split: "," %}
                {% for video in site.videos %}
                    {% for category in video.categories %}
                        {% unless categories contains category %}
                            {% assign categories = categories | push: category %}
                        {% endunless %}
                    {% endfor %}
                {% endfor %} 
                <div class="im-video-categories mb-5">
                    <div class="tabs">
                        <ul>
                            <li class="is-active"><a href="?category=all">All Videos</a></li>
                            {% for category in categories %}
                                <li><a href="?category={{ category | slugify }}">{{ category }}</a></li>
                            {% endfor %}
                        </ul>
                    </div>
                </div>
                    <div class="im-video-grid">
                        <div class="columns is-multiline">
                            {% for video in site.videos %}
                            <div class="column is-4">
                            <div class="im-video-card">
                                <div class="im-video-thumbnail">
                                <a href="{{ video.url }}">
                                    <img alt="{{ video.title }}" loading="lazy" width="1280" height="720" decoding="async" class="im-video-image" 
                                        src="https://img.youtube.com/vi/{{ video.VideoId }}/maxresdefault.jpg">
                                    <div class="im-video-duration">{{ video.duration }}</div>
                                    <div class="im-video-play-overlay">
                                    <div class="im-video-play-button"><i class="fas fa-play"></i></div>
                                    </div>
                                </a>
                                </div>
                                <div class="im-video-content">
                                {% assign video_author = page.author %}
                                {% assign author_found = false %}
                                
                                {%- if site.author.name == video_author -%}
                                    {% assign author_name = site.author.name %}
                                    {% assign author_image = site.author.image %}
                                    {% assign author_found = true %}
                                {%- else -%}
                                    {% for author_key in site.data.authors %}
                                    {% assign author_data = site.data.authors[author_key[0]] %}
                                    {% if author_data.name == video_author %}
                                        {% assign author_name = author_data.name %}
                                        {% assign author_image = author_data.image %}
                                        {% assign author_found = true %}
                                        {% break %}
                                    {% endif %}
                                    {% endfor %}
                                {%- endif -%}
<div class="im-video-author">
                                    {% if author_found %}
                                        <img alt="{{ author_name }}" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" class="im-video-author-image" src="{{ author_image | default: 'https://dummyimage.com/50/000000/fff&text=File' }}" style="color: transparent;">
                                    {% else %}
                                        <img alt="Unknown Author" loading="lazy" width="40" height="40" decoding="async" data-nimg="1" class="im-video-author-image" src="/placeholder.svg?height=100&amp;width=100" style="color: transparent;">
                                    {% endif %}
                                </div>
                                <div class="im-video-details">
                                    <a href="{{ video.url }}" class="im-video-title-link">
                                    <h3 class="im-video-title">{{ video.title }}</h3>
                                    </a>
                                    <div class="im-video-meta">
                                    <span class="im-video-author-name">{{ video.author }}</span>
                                    <span class="im-video-dot">•</span>
                                    <span class="im-video-views">{{ video.views }} views</span>
                                    <span class="im-video-dot">•</span>
                                    <span class="im-video-date">{{ video.date | date: "%B %d, %Y" }}</span>
                                    </div>
                                    <a href="{{ video.url }}" class="button is-primary is-small mt-2">Watch Now</a>
                                </div>
                                </div>
                            </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                </div>
    <div class="column is-3">
                    <div class="im-video-sidebar">
                        <div class="im-video-sidebar-section">
                            <h3 class="im-video-sidebar-title">Popular Videos</h3>
                            <div class="im-video-sidebar-content">
                                <a href="/videos/desk-setup-2023" class="im-video-sidebar-item">
                                    <div class="im-video-sidebar-thumbnail">
                                        <img
                                            alt="My 2023 Desk Setup Tour"
                                            loading="lazy"
                                            width="120"
                                            height="68"
                                            decoding="async"
                                            data-nimg="1"
                                            class="im-video-sidebar-image"
                                            src="https://dummyimage.com/600x400/000/fff"
                                            style="color: transparent;"
                                        />
                                        <div class="im-video-sidebar-duration">15:40</div>
                                    </div>
                                    <div class="im-video-sidebar-details">
                                        <h4 class="im-video-sidebar-title">My 2023 Desk Setup Tour</h4>
                                        <div class="im-video-sidebar-meta"><span class="im-video-sidebar-views">320K views</span><span class="im-video-sidebar-dot">•</span><span class="im-video-sidebar-date">April 5, 2023</span></div>
                                    </div>
                                </a>
                                <a href="/videos/macbook-pro-m2-review" class="im-video-sidebar-item">
                                    <div class="im-video-sidebar-thumbnail">
                                        <img
                                            alt="MacBook Pro M2 Review for Developers"
                                            loading="lazy"
                                            width="120"
                                            height="68"
                                            decoding="async"
                                            data-nimg="1"
                                            class="im-video-sidebar-image"
                                            src="https://dummyimage.com/600x400/000/fff"
                                            style="color: transparent;"
                                        />
                                        <div class="im-video-sidebar-duration">24:15</div>
                                    </div>
                                    <div class="im-video-sidebar-details">
                                        <h4 class="im-video-sidebar-title">MacBook Pro M2 Review for Developers</h4>
                                        <div class="im-video-sidebar-meta"><span class="im-video-sidebar-views">275K views</span><span class="im-video-sidebar-dot">•</span><span class="im-video-sidebar-date">March 10, 2023</span></div>
                                    </div>
                                </a>
                                <a href="/videos/useeffect-deep-dive" class="im-video-sidebar-item">
                                    <div class="im-video-sidebar-thumbnail">
                                        <img
                                            alt="React Hooks Explained: useEffect Deep Dive"
                                            loading="lazy"
                                            width="120"
                                            height="68"
                                            decoding="async"
                                            data-nimg="1"
                                            class="im-video-sidebar-image"
                                            src="https://dummyimage.com/600x400/000/fff"
                                            style="color: transparent;"
                                        />
                                        <div class="im-video-sidebar-duration">28:45</div>
                                    </div>
                                    <div class="im-video-sidebar-details">
                                        <h4 class="im-video-sidebar-title">React Hooks Explained: useEffect Deep Dive</h4>
                                        <div class="im-video-sidebar-meta"><span class="im-video-sidebar-views">254K views</span><span class="im-video-sidebar-dot">•</span><span class="im-video-sidebar-date">March 22, 2023</span></div>
                                    </div>
                                </a>
                                <a href="/videos/vscode-extensions" class="im-video-sidebar-item">
                                    <div class="im-video-sidebar-thumbnail">
                                        <img
                                            alt="5 VS Code Extensions Every Developer Needs"
                                            loading="lazy"
                                            width="120"
                                            height="68"
                                            decoding="async"
                                            data-nimg="1"
                                            class="im-video-sidebar-image"
                                            src="https://dummyimage.com/600x400/000/fff"
                                            style="color: transparent;"
                                        />
                                        <div class="im-video-sidebar-duration">12:45</div>
                                    </div>
                                    <div class="im-video-sidebar-details">
                                        <h4 class="im-video-sidebar-title">5 VS Code Extensions Every Developer Needs</h4>
                                        <div class="im-video-sidebar-meta"><span class="im-video-sidebar-views">230K views</span><span class="im-video-sidebar-dot">•</span><span class="im-video-sidebar-date">January 20, 2023</span></div>
                                    </div>
                                </a>
                                <a href="/videos/day-in-life-software-engineer" class="im-video-sidebar-item">
                                    <div class="im-video-sidebar-thumbnail">
                                        <img
                                            alt="A Day in the Life of a Software Engineer"
                                            loading="lazy"
                                            width="120"
                                            height="68"
                                            decoding="async"
                                            data-nimg="1"
                                            class="im-video-sidebar-image"
                                            src="https://dummyimage.com/600x400/000/fff"
                                            style="color: transparent;"
                                        />
                                        <div class="im-video-sidebar-duration">18:30</div>
                                    </div>
                                    <div class="im-video-sidebar-details">
                                        <h4 class="im-video-sidebar-title">A Day in the Life of a Software Engineer</h4>
                                        <div class="im-video-sidebar-meta"><span class="im-video-sidebar-views">210K views</span><span class="im-video-sidebar-dot">•</span><span class="im-video-sidebar-date">February 5, 2023</span></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="im-video-sidebar-section">
                            <h3 class="im-video-sidebar-title">Categories</h3>
                            <div class="im-video-sidebar-content">
                                <div class="im-video-categories-list">
                                    <a class="im-video-category-item is-active">Tutorials<span class="im-video-category-count">6</span></a><a class="im-video-category-item">Reviews<span class="im-video-category-count">2</span></a>
                                    <a class="im-video-category-item">Coding<span class="im-video-category-count">0</span></a><a class="im-video-category-item">Vlogs<span class="im-video-category-count">3</span></a>
                                    <a class="im-video-category-item">Interviews<span class="im-video-category-count">1</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="im-video-sidebar-section">
                            <h3 class="im-video-sidebar-title">Tags</h3>
                            <div class="im-video-sidebar-content">
                                <div class="im-video-tags-cloud">
                                    <a href="/videos/tag/react" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        React
                                    </a>
                                    <a href="/videos/tag/javascript" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        JavaScript
                                    </a>
                                    <a href="/videos/tag/nextjs" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        Next.js
                                    </a>
                                    <a href="/videos/tag/typescript" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        TypeScript
                                    </a>
                                    <a href="/videos/tag/css" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        CSS
                                    </a>
                                    <a href="/videos/tag/html" class="im-video-tag-cloud-item" style="font-size: 1.4rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        HTML
                                    </a>
                                    <a href="/videos/tag/nodejs" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        Node.js
                                    </a>
                                    <a href="/videos/tag/mongodb" class="im-video-tag-cloud-item" style="font-size: 1.3rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        MongoDB
                                    </a>
                                    <a href="/videos/tag/graphql" class="im-video-tag-cloud-item" style="font-size: 1.2rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        GraphQL
                                    </a>
                                    <a href="/videos/tag/redux" class="im-video-tag-cloud-item" style="font-size: 1.5rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        Redux
                                    </a>
                                    <a href="/videos/tag/tailwind" class="im-video-tag-cloud-item" style="font-size: 1.4rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        Tailwind
                                    </a>
                                    <a href="/videos/tag/bulma" class="im-video-tag-cloud-item" style="font-size: 1.1rem;">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="lucide lucide-tag im-video-tag-icon"
                                        >
                                            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                                            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                        </svg>
                                        Bulma
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="im-video-sidebar-section">
                            <div class="im-video-subscribe-card">
                                <h3 class="im-video-subscribe-title">Subscribe for Updates</h3>
                                <p class="im-video-subscribe-text">Get notified when new videos are published</p>
                                <div class="field">
                                    <div class="control"><input class="input" placeholder="Your email address" type="email" /></div>
                                </div>
                                <button class="button is-danger is-fullwidth">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </main>
