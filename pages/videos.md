---
layout: default
title: All Videos
collection : videos
permalink: /videos
---
<!-- Hero Section with Video Background -->
<section class="hero is-primary is-small hero-video-section">
    <video autoplay muted loop playsinline class="hero-video-bg">
        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div class="hero-video-grid-overlay"></div>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title is-1 has-text-white has-text-shadow-strong">
                My Video Library
            </h1>
            <h2 class="subtitle is-4 has-text-white has-text-shadow">
                Learn, create and grow your YouTube channel with my tutorials
            </h2>
        </div>
    </div>
</section>

<!-- Breadcrumb -->
<section class="section pt-4 pb-2">
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="/"><i class="fas fa-arrow-left mr-2"></i> Back to Home</a></li>
                <li class="is-active"><a href="#" aria-current="page">All Videos</a></li>
            </ul>
        </nav>
    </div>
</section>

<!-- Main Content -->
<section class="section pt-2">
    <div class="container">
        <!-- Top Ad Banner -->
        <div class="mb-5">
            <div class="ad-container rectangle-ad">
                <div class="ad-placeholder">
                    <span class="ad-label">Advertisement</span>
                    <div class="ad-content">300x250 Rectangle</div>
                </div>
            </div>
        </div>
        <div class="columns">
            <!-- Main Video Listing (9 columns) -->
            <div class="column is-9">
                <!-- Search Box (Visual Only) -->
                <div class="field">
                    <div class="control has-icons-left">
                        <input class="input is-medium" type="text" placeholder="Search videos... (visual only)" id="videoSearch" disabled>
                        <span class="icon is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                
                <!-- Tag Filters (Visual Only) -->
                {% assign all_tags = "" | split: "," %}
                {% for video in site.videos %}
                    {% for tag in video.tags %}
                        {% unless all_tags contains tag %}
                            {% assign all_tags = all_tags | push: tag %}
                        {% endunless %}
                    {% endfor %}
                {% endfor %}
                
                <div class="field is-grouped is-grouped-multiline tag-filter mb-5">
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-medium is-static">All</span>
                            <span class="tag is-medium is-static">{{ site.videos.size }}</span>
                        </div>
                    </div>
                    {% for tag in all_tags %}
                    {% assign tag_videos = site.videos | where_exp: "video", "video.tags contains tag" %}
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-medium is-static">{{ tag }}</span>
                            <span class="tag is-medium is-static">{{ tag_videos.size }}</span>
                        </div>
                    </div>
                    {% endfor %}
                </div>
                
                <!-- Video Grid -->
                <div class="columns is-multiline" id="videoContainer">
                    {% for video in site.videos %}
                    <div class="column is-one-third-desktop is-half-tablet video-column video-card">
                        <a href="{{ video.url | relative_url }}" class="video-card-link">
                            <div class="card">
                                <div class="card-image">
                                    <div class="video-thumbnail">
                                        <img src="https://img.youtube.com/vi/{{ video.VideoId }}/maxresdefault.jpg" alt="{{ video.title }}">
                                        <span class="video-duration">{{ video.duration }}</span>
                                        <div class="video-hover-overlay">
                                            <i class="fas fa-play"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            {% if video.author_image %}
                                                <img class="author-avatar" src="{{ video.author_image | relative_url }}" alt="{{ video.author }}">
                                            {% else %}
                                                <img class="author-avatar" src="/assets/logos/logo.svg" alt="{{ video.author }}">
                                            {% endif %}
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-5">{{ video.title }}</p>
                                            <p class="subtitle is-6">{{ video.author }}</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        {{ video.description | truncate: 120 }}
                                        <br>
                                        <small class="has-text-grey">Uploaded: {{ video.date | date: "%B %d, %Y" }}</small>
                                    </div>
                                    <div class="tags">
                                        {% for tag in video.tags %}
                                        <span class="tag">{{ tag }}</span>
                                        {% endfor %}
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                    {% endfor %}
                </div>
                
                <!-- Middle Ad Banner -->
                <div class="my-5">
                    <div class="ad-container banner-ad">
                        <div class="ad-placeholder">
                            <span class="ad-label">Advertisement</span>
                            <div class="ad-content">970x250 Billboard</div>
                        </div>
                    </div>
                </div>
                
                <!-- Pagination (Visual Only) -->
                <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                    <a class="pagination-previous" disabled>Previous</a>
                    <a class="pagination-next" disabled>Next page</a>
                    <ul class="pagination-list">
                        <li><a class="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a></li>
                        <li><a class="pagination-link" aria-label="Goto page 2">2</a></li>
                        <li><a class="pagination-link" aria-label="Goto page 3">3</a></li>
                    </ul>
                </nav>
                
                <!-- Masterclass Section -->
                <section class="section">
                    <div class="content has-text-centered">
                        <h2 class="title is-3">YouTube Masterclass</h2>
                        <p>Join my comprehensive course where I teach everything I know about growing a successful YouTube channel from scratch. Covers content creation, editing, SEO, monetization, and more.</p>
                        <button class="button is-primary is-medium mt-4">Enroll Now</button>
                    </div>
                </section>
                
                <!-- Request Video Section -->
                <section class="section">
                    <div class="box">
                        <h2 class="title is-4">Request a Video</h2>
                        <p>Have a topic you'd like me to cover? Let me know!</p>
                        <iframe data-tally-src="https://tally.so/embed/w2o9Dj?alignLeft=1&transparentBackground=1" loading="lazy" width="100%" height="300" frameborder="0" marginheight="0" marginwidth="0" title="Video Request"></iframe>
                        <script>var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}</script>
                        <!-- Removed redundant button: <button class="button is-info">Submit Request</button> -->
                    </div>
                </section>
                
                <!-- My Gear Section -->
                <section class="section">
                    <h2 class="title is-3">My Video Production Gear</h2>
                    <div class="columns is-multiline">
                        <!-- Product 1 -->
                        <div class="column is-one-third-desktop is-half-tablet">
                            <div class="card product-card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://via.placeholder.com/300x225" alt="Camera gear">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-5">Primary Camera</p>
                                    <p class="subtitle is-6">For all my video work</p>
                                    <div class="content">
                                        <p>The camera I use for most of my YouTube videos and tutorials.</p>
                                        <a href="#" class="button is-small is-link">View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Product 2 -->
                        <div class="column is-one-third-desktop is-half-tablet">
                            <div class="card product-card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://via.placeholder.com/300x225" alt="Microphone">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-5">Main Microphone</p>
                                    <p class="subtitle is-6">For crystal clear audio</p>
                                    <div class="content">
                                        <p>Professional microphone that ensures great sound quality.</p>
                                        <a href="#" class="button is-small is-link">View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Product 3 -->
                        <div class="column is-one-third-desktop is-half-tablet">
                            <div class="card product-card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src="https://via.placeholder.com/300x225" alt="Lighting">
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-5">Lighting Setup</p>
                                    <p class="subtitle is-6">For perfect illumination</p>
                                    <div class="content">
                                        <p>Lighting kit that makes every video look professional.</p>
                                        <a href="#" class="button is-small is-link">View Details</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
            <!-- Sidebar (3 columns) -->
            <div class="column is-3">
                <div class="sticky-sidebar">
                    <!-- Sidebar Ad -->
                    <div class="mb-5">
                        <div class="ad-container square-ad">
                            <div class="ad-placeholder">
                                <span class="ad-label">Advertisement</span>
                                <div class="ad-content">300x250 Square</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Masterclass Promotion -->
                    <div class="box mb-5">
                        <h3 class="title is-5">Free Masterclass</h3>
                        <figure class="image is-16by9 mb-3">
                            <img src="https://via.placeholder.com/320x180" alt="Masterclass thumbnail">
                        </figure>
                        <p>Get started with my free YouTube masterclass covering the basics of content creation.</p>
                        <button class="button is-primary is-fullwidth mt-3">Get Free Access</button>
                    </div>
                    
                    <!-- Request Video (Visual Only - Tally form is primary) -->
                    <div class="box mb-5">
                        <h3 class="title is-5">Video Requests</h3>
                        <p>What should I make next? (Use form above)</p>
                        <div class="field">
                            <div class="control">
                                <input class="input" type="text" placeholder="Your video idea" disabled>
                            </div>
                        </div>
                        <button class="button is-info is-fullwidth" disabled>Submit</button>
                    </div>
                    
                    <!-- Popular Videos -->
                    <div class="box">
                        <h3 class="title is-5">Most Popular</h3>
                        {% assign popular_videos = site.videos | sort: 'views' | reverse | slice: 0, 5 %}
                        {% for video in popular_videos %}
                        <a href="{{ video.url | relative_url }}" class="video-sidebar-link">
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
                        </a>
                        {% endfor %}
                    </div>
                    
                    <!-- Sidebar Bottom Ad -->
                    <div class="mt-5">
                        <div class="ad-container skyscraper-ad">
                            <div class="ad-placeholder">
                                <span class="ad-label">Advertisement</span>
                                <div class="ad-content">160x600 Skyscraper</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
/* Hero Video Background Styles */
.hero-video-section {
    position: relative;
    overflow: hidden; /* Ensures video doesn't spill out */
    background-color: #363636; /* Fallback color */
}

.hero-video-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    z-index: 0; /* Behind content and overlay */
}

.hero-video-grid-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
    background-size: 30px 30px; /* Size of the grid cells */
    z-index: 1; /* On top of video, below content */
    pointer-events: none; /* Allows clicks to pass through to video if needed */
}

.hero-video-section .hero-body {
    position: relative; /* To ensure it's above the video and overlay */
    z-index: 2;
    background-color: rgba(0,0,0,0.3); /* Optional: darkens video slightly for text contrast */
}

.has-text-shadow {
    text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
}
.has-text-shadow-strong {
    text-shadow: 2px 2px 5px rgba(0,0,0,0.8);
}


/* Video Thumbnail Styles */
.video-thumbnail {
    position: relative;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    background-color: #f5f5f5;
    margin-bottom: 0.5rem;
    overflow: hidden;
    transition: all 0.3s ease;
}

.video-thumbnail img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.video-duration {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.8rem;
    z-index: 2;
}

.video-hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.video-hover-overlay i {
    color: white;
    font-size: 2rem;
}

/* Video Card Hover Effects */
.video-card-link:hover .video-thumbnail img {
    transform: scale(1.05);
}

.video-card-link:hover .video-hover-overlay {
    opacity: 1;
}

.video-card-link:hover .card {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

.video-card-link .card {
    transition: all 0.3s ease;
    height: 100%; /* Makes cards in a row equal height */
}

/* Author Avatar */
.author-avatar {
    width: 24px; /* Bulma's media-left usually handles image child fine, but explicit can help */
    height: 24px;
    border-radius: 50%;
    /* margin-right: 5px; Removed, Bulma media object spacing is usually good */
}

/* Sticky Sidebar */
.sticky-sidebar {
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 20px; /* Adjust as needed based on your navbar height if any */
}

/* Tag Filter Styles (Now Visual Only) */
.tag-filter .tag.is-static { /* Using is-static to show they are not interactive */
    margin-bottom: 5px;
}
/* Removed hover/active as they are non-functional */

/* Product Card Styles */
.product-card {
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    height: 100%; /* Makes cards in a row equal height */
}

.product-card:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
}

/* Advertisement Styles */
.ad-container {
    background: #f5f5f5;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1.5rem; /* Bulma mb-5 is 1.5rem, so this is consistent */
}

.ad-placeholder {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eaeaea;
    color: #999;
    font-weight: bold;
    text-align: center;
    min-height: 90px; /* Minimum height for all ads */
}

.ad-label {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 0.7rem;
    color: #999;
    background: white;
    padding: 2px 5px;
    border-radius: 3px;
}

.leaderboard-ad .ad-placeholder { /* This was in hero, now removed, but kept style for other potential uses */
    height: 90px;
    width: 100%; /* Made responsive by default */
    max-width: 728px; /* Common leaderboard size */
    margin: 0 auto;
}

.rectangle-ad .ad-placeholder {
    height: 250px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
}

.banner-ad .ad-placeholder {
    height: 250px;
    width: 100%;
    max-width: 970px;
    margin: 0 auto;
}

.square-ad .ad-placeholder {
    height: 250px;
    width: 100%;
    max-width: 300px; /* Sidebar context */
}

.skyscraper-ad .ad-placeholder {
    height: 600px;
    width: 100%;
    max-width: 160px; /* Sidebar context */
    margin: 0 auto;
}

/* Sidebar Video Links */
.video-sidebar-link {
    display: block;
    transition: all 0.2s ease;
    border-radius: 4px; /* Slight rounding for hover */
}

.video-sidebar-link:hover {
    background: #f5f5f5;
    transform: translateX(3px); /* Subtle shift */
}
.video-sidebar-link .media {
    align-items: center; /* Vertically align image and text */
}


/* Responsive Styles (Bulma handles a lot, these are additions/overrides) */
@media screen and (max-width: 1023px) { /* Bulma's 'desktop' breakpoint */
    .sticky-sidebar {
        position: static; /* Disable sticky sidebar on tablet and mobile */
    }
}

@media screen and (max-width: 768px) { /* Bulma's 'tablet' breakpoint */
    /* video-column is already is-half-tablet. For mobile, Bulma columns stack by default. */
    /* If you want two per row on mobile for videos:
    .video-column.is-half-tablet {
        flex: none;
        width: 50%;
    }
    */
    .hero-body .title.is-1 {
        font-size: 2.5rem; /* Adjust hero title for smaller screens */
    }
    .hero-body .subtitle.is-4 {
        font-size: 1.1rem; /* Adjust hero subtitle */
    }
    .ad-placeholder {
        font-size: 0.9em; /* Smaller text for ad placeholders */
    }
}

/* Remove JavaScript section as per request */
</style>

<!-- 
    Removed JavaScript:
    The search functionality, tag filtering, and dynamic pagination previously handled by JavaScript
    have been removed. The corresponding UI elements (search input, tag buttons, pagination controls)
    are now visual placeholders and will not perform any actions.
    The Tally embed script is kept as it's a third-party embed.
-->