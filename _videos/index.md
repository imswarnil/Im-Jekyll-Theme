---
layout: default
title: All Videos
collection : videos
permalink: /videos
---

<main class="im-video-page">
    {% include utility/breadcrumb.html %}
    
    <section class="section">
        <div class="container">
            <a href="/" class="button is-light is-small mb-6">
                <i class="fas fa-arrow-left mr-2"></i> Back to Home
            </a>
            
            <div class="im-video-header mb-6">
                <h1 class="title is-1">{{ page.title | default: "Videos" }}</h1>
                <p class="subtitle is-4">{{ page.description | default: "Tutorials, reviews, vlogs, and more" }}</p>
            </div>
            
            <div class="columns">
                <div class="column is-9">
                    <!-- Search Box -->
                    <div class="im-video-search mb-5">
                        <div class="field has-addons">
                            <div class="control is-expanded">
                                <input class="input" type="text" placeholder="Search videos..." id="videoSearch">
                            </div>
                            <div class="control">
                                <button class="button is-primary" id="searchButton">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tag Filters -->
                    {% assign all_tags = "" | split: "," %}
                    {% for video in site.videos %}
                        {% for tag in video.tags %}
                            {% unless all_tags contains tag %}
                                {% assign all_tags = all_tags | push: tag %}
                            {% endunless %}
                        {% endfor %}
                    {% endfor %}
                    
                    <div class="im-video-categories mb-5">
                        <div class="tabs">
                            <ul>
                                <li class="is-active"><a href="#" data-filter="all">All Videos</a></li>
                                {% for tag in all_tags %}
                                    <li><a href="#" data-filter="{{ tag | slugify }}">{{ tag }}</a></li>
                                {% endfor %}
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Video Grid -->
                    <div class="im-video-grid">
                        <div class="columns is-multiline" id="videoContainer">
                            {% for video in site.videos %}
                            <div class="column is-4 video-card" 
                                 data-tags="{% for tag in video.tags %}{{ tag | slugify }} {% endfor %}"
                                 data-title="{{ video.title | downcase }}"
                                 data-description="{{ video.description | downcase }}">
                                <div class="im-video-card">
                                    <div class="im-video-thumbnail">
                                        <a href="{{ video.url | relative_url }}">
                                            {% if video.image %}
                                                <img src="{{ video.image | relative_url }}" alt="{{ video.title }}" loading="lazy" class="im-video-image">
                                            {% else %}
                                                <img src="https://img.youtube.com/vi/{{ video.VideoId }}/maxresdefault.jpg" alt="{{ video.title }}" loading="lazy" class="im-video-image">
                                            {% endif %}
                                            <div class="im-video-duration">{{ video.duration }}</div>
                                            <div class="im-video-play-overlay">
                                                <div class="im-video-play-button"><i class="fas fa-play"></i></div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="im-video-content">
                                        <div class="im-video-author">
                                            {% if video.author_image %}
                                                <img src="{{ video.author_image | relative_url }}" alt="{{ video.author }}" class="im-video-author-image">
                                            {% else %}
                                                <img src="https://via.placeholder.com/50" alt="{{ video.author }}" class="im-video-author-image">
                                            {% endif %}
                                        </div>
                                        <div class="im-video-details">
                                            <a href="{{ video.url | relative_url }}" class="im-video-title-link">
                                                <h3 class="im-video-title">{{ video.title }}</h3>
                                            </a>
                                            <div class="im-video-meta">
                                                <span class="im-video-author-name">{{ video.author }}</span>
                                                <span class="im-video-dot">•</span>
                                                <span class="im-video-date">{{ video.date | date: "%B %d, %Y" }}</span>
                                            </div>
                                            <div class="tags are-small mt-2">
                                                {% for tag in video.tags %}
                                                <span class="tag">{{ tag }}</span>
                                                {% endfor %}
                                            </div>
                                            <a href="{{ video.url | relative_url }}" class="button is-primary is-small mt-2">Watch Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                    
                    <!-- Pagination -->
                    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                        <a class="pagination-previous">Previous</a>
                        <a class="pagination-next">Next page</a>
                        <ul class="pagination-list">
                            <li><a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a></li>
                            <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                            <li><a class="pagination-link" aria-label="Goto page 3">3</a></li>
                        </ul>
                    </nav>
                    
                    <!-- Masterclass Section -->
                    <section class="section">
                        <div class="content has-text-centered">
                            <h2 class="title is-3">Want to Learn More?</h2>
                            <p>Join my YouTube Masterclass where I teach everything I know about growing a successful YouTube channel from scratch. This comprehensive course covers content creation, editing, SEO, monetization, and much more.</p>
                            <button class="button is-primary is-medium mt-4">Enroll in Masterclass</button>
                        </div>
                    </section>
                    
                    <!-- Request Video Section -->
                    <section class="section">
                        <div class="box">
                            <h2 class="title is-4">Request a Video</h2>
                            <p>Is there a specific topic you'd like me to cover? Let me know!</p>
                            <div class="field">
                                <div class="control">
                                    <textarea class="textarea" placeholder="What video would you like to see?"></textarea>
                                </div>
                            </div>
                            <button class="button is-info">Submit Request</button>
                        </div>
                    </section>
                    
                    <!-- My Gear Section -->
                    <section class="section">
                        <h2 class="title is-3">My Video Production Gear</h2>
                        <div class="columns is-multiline">
                            <!-- Product cards would go here -->
                            <div class="column is-one-third">
                                <div class="card">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img src="https://via.placeholder.com/300x225" alt="Camera gear">
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <p class="title is-5">My Camera</p>
                                        <div class="content">
                                            The primary camera I use for all my videos.
                                        </div>
                                        <a href="#" class="button is-small is-link">View Product</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Add more gear items as needed -->
                        </div>
                    </section>
                </div>
                
                <!-- Sidebar (3 columns) -->
                <div class="column is-3">
                    <div class="im-video-sidebar sticky-sidebar">
                        <!-- Masterclass Promotion -->
                        <div class="box mb-5">
                            <h3 class="title is-5">YouTube Masterclass</h3>
                            <figure class="image is-16by9 mb-3">
                                <img src="https://via.placeholder.com/320x180" alt="Masterclass thumbnail">
                            </figure>
                            <p>Learn how to grow your YouTube channel from 0 to 100,000 subscribers with my proven strategies.</p>
                            <button class="button is-primary is-fullwidth mt-3">Enroll Now</button>
                        </div>
                        
                        <!-- Request Video -->
                        <div class="box mb-5">
                            <h3 class="title is-5">Request a Video</h3>
                            <p>What topic should I cover next?</p>
                            <div class="field">
                                <div class="control">
                                    <input class="input" type="text" placeholder="Your video idea">
                                </div>
                            </div>
                            <button class="button is-info is-fullwidth">Submit</button>
                        </div>
                        
                        <!-- Popular Videos -->
                        <div class="box">
                            <h3 class="title is-5">Most Popular</h3>
                            {% assign popular_videos = site.videos | sort: 'views' | reverse | slice: 0, 5 %}
                            {% for video in popular_videos %}
                            <article class="media mb-4">
                                <figure class="media-left">
                                    <p class="image is-64x64">
                                        {% if video.image %}
                                            <img src="{{ video.image | relative_url }}" alt="{{ video.title }}">
                                        {% else %}
                                            <img src="https://img.youtube.com/vi/{{ video.VideoId }}/default.jpg" alt="{{ video.title }}">
                                        {% endif %}
                                    </p>
                                </figure>
                                <div class="media-content">
                                    <p class="is-size-6 has-text-weight-semibold">{{ video.title | truncate: 40 }}</p>
                                    <small>{{ video.views | default: "0" }} views</small>
                                </div>
                            </article>
                            {% endfor %}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Search functionality
    const searchInput = document.getElementById('videoSearch');
    const searchButton = document.getElementById('searchButton');
    const videoCards = document.querySelectorAll('.video-card');
    
    function filterVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        
        videoCards.forEach(card => {
            const title = card.dataset.title;
            const description = card.dataset.description;
            const tags = card.dataset.tags;
            
            if (searchTerm === '' || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tags.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', filterVideos);
    searchButton.addEventListener('click', filterVideos);
    
    // Tag filtering
    const filterTabs = document.querySelectorAll('.tabs a');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.dataset.filter;
            
            // Update active tab
            filterTabs.forEach(t => t.parentNode.classList.remove('is-active'));
            this.parentNode.classList.add('is-active');
            
            // Filter videos
            videoCards.forEach(card => {
                const tags = card.dataset.tags;
                
                if (filterValue === 'all' || tags.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
</script>