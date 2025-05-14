---
layout: default
title: All Videos
# collection: videos # Not strictly needed here if we iterate site.videos directly
permalink: /videos/
# Add a variable for items per page, configurable here
items_per_page: 2
---
<!-- Hero Section ... (KEEP AS IS) ... -->
<section class="hero is-primary is-small">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-vcentered">
                <!-- Left Side - Title/Description -->
                <div class="column is-auto">
                    <h1 class="title is-1">
                        My Video Library
                    </h1>
                    <h2 class="subtitle is-4">
                        Learn, create and grow your YouTube channel with my tutorials
                    </h2>
                </div>
                <!-- Right Side - Leaderboard Ad -->
                <div class="column is-auto">
                    <div class="ad-container leaderboard-ad">
                        <div class="ad-placeholder">
                            <span class="ad-label">Advertisement</span>
                            <div class="ad-content">
                            <ins class="adsbygoogle"
                                 style="display:inline-block;width:980px;height:90px"
                                 data-ad-client="ca-pub-1291242080282540"
                                 data-ad-slot="8539588233"></ins>
                            <script>
                                 (adsbygoogle = window.adsbygoogle || []).push({});
                            </script>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Breadcrumb ... (KEEP AS IS) ... -->
<section class="section pt-4 pb-2">
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="{{ '/' | relative_url }}"><i class="fas fa-arrow-left mr-2"></i> Back to Home</a></li>
                <li class="is-active"><a href="{{ page.url | relative_url }}" aria-current="page">All Videos</a></li>
            </ul>
        </nav>
    </div>
</section>

<!-- Main Content -->
<section class="section pt-2">
    <div class="container">
        <!-- Top Ad Banner ... (KEEP AS IS) ... -->
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
                <!-- Search Box -->
                <div class="field">
                    <div class="control has-icons-left">
                        <input class="input is-medium" type="text" placeholder="Search videos..." id="videoSearch">
                        <span class="icon is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>

                <!-- Tag Filters -->
                {% assign all_video_tags = "" | split: "" %}
                {% for video in site.videos %}
                    {% for tag in video.tags %}
                        {% unless all_video_tags contains tag %}
                            {% assign all_video_tags = all_video_tags | push: tag %}
                        {% endunless %}
                    {% endfor %}
                {% endfor %}
                {% assign all_video_tags = all_video_tags | uniq | sort %}

                <div class="field is-grouped is-grouped-multiline tag-filter mb-5">
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-medium is-active filter-tag" data-filter="all">All</span>
                            <span class="tag is-medium">{{ site.videos.size }}</span>
                        </div>
                    </div>
                    {% for tag in all_video_tags %}
                    {% assign tag_videos_count = site.videos | where_exp: "video", "video.tags contains tag" | size %}
                    {% if tag_videos_count > 0 %}
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-medium filter-tag" data-filter="{{ tag | slugify }}">{{ tag }}</span>
                            <span class="tag is-medium">{{ tag_videos_count }}</span>
                        </div>
                    </div>
                    {% endif %}
                    {% endfor %}
                </div>

                <!-- Video Grid -->
                <div class="columns is-multiline" id="videoContainer">
                    {% for video in site.videos %}
                    <div class="column is-one-third video-column video-card"
                         data-tags="{% for tag in video.tags %}{{ tag | slugify }} {% endfor %}"
                         data-title="{{ video.title | downcase | escape }}"
                         data-description="{{ video.description | downcase | escape }}"
                         style="display: none;" {% comment %}Initially hidden by JS for pagination {% endcomment %}>
                        <a href="{{ video.url | relative_url }}" class="video-card-link">
                            <div class="card">
                                <div class="card-image">
                                    <div class="video-thumbnail">
                                        <img src="https://img.youtube.com/vi/{{ video.VideoId }}/maxresdefault.jpg" alt="{{ video.title | escape }}">
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
                                                <img class="author-avatar" src="{{ video.author_image | relative_url }}" alt="{{ video.author | escape }}">
                                            {% else %}
                                                <img class="author-avatar" src="https://via.placeholder.com/48?text={{ video.author | slice: 0 | upcase }}" alt="{{ video.author | escape }}">
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
                 <div id="no-videos-found" class="has-text-centered" style="display: none; margin: 2rem 0;">
                    <p class="is-size-5">No videos match your current filters.</p>
                </div>


                <!-- Middle Ad Banner ... (KEEP AS IS) ... -->
                <div class="my-5">
                    <div class="ad-container banner-ad">
                        <div class="ad-placeholder">
                            <span class="ad-label">Advertisement</span>
                            <div class="ad-content">970x250 Billboard</div>
                        </div>
                    </div>
                </div>

                <!-- Pagination (JS will manage this) -->
                <nav id="video-pagination" class="pagination is-centered" role="navigation" aria-label="pagination" style="display: none;">
                    <a class="pagination-previous" disabled>Previous</a>
                    <a class="pagination-next" disabled>Next page</a>
                    <ul class="pagination-list">
                        <!-- JS will populate this -->
                    </ul>
                </nav>

                <!-- Masterclass Section ... (KEEP AS IS) ... -->
                <!-- Request Video Section ... (KEEP AS IS) ... -->
                <!-- My Gear Section ... (KEEP AS IS) ... -->
            </div>

            <!-- Sidebar (3 columns) ... (KEEP AS IS) ... -->
            <div class="column is-3">
              <!-- ... your existing sidebar content ... -->
            </div>
        </div>
    </div>
</section>

<!-- Style section ... (KEEP AS IS, or add minor tweaks if needed) ... -->
<style>
/* ... your existing styles ... */
.video-card[style*="display: none"] { /* Ensures it's truly hidden if column has padding */
    padding: 0 !important;
    margin: 0 !important;
    height: 0 !important;
    overflow: hidden !important;
    visibility: hidden !important; /* Stronger hiding */
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const ITEMS_PER_PAGE = {{ page.items_per_page | default: 6 }}; // Use frontmatter or default
    let currentPage = 1;
    const videoSearchInput = document.getElementById('videoSearch');
    const allVideoCards = Array.from(document.querySelectorAll('#videoContainer .video-card'));
    const tagFilterElements = document.querySelectorAll('.filter-tag');
    const videoContainer = document.getElementById('videoContainer');
    const noVideosFoundMessage = document.getElementById('no-videos-found');

    // Pagination elements
    const paginationNav = document.getElementById('video-pagination');
    const paginationList = paginationNav.querySelector('.pagination-list');
    const prevButton = paginationNav.querySelector('.pagination-previous');
    const nextButton = paginationNav.querySelector('.pagination-next');

    let currentFilteredVideos = [];

    function applyFiltersAndPaginate() {
        const searchTerm = videoSearchInput.value.toLowerCase().trim();
        const activeTagFilter = document.querySelector('.filter-tag.is-active').dataset.filter;

        currentFilteredVideos = allVideoCards.filter(card => {
            const title = card.dataset.title;
            const description = card.dataset.description;
            const cardTags = card.dataset.tags;

            const searchMatch = searchTerm === '' ||
                                title.includes(searchTerm) ||
                                description.includes(searchTerm) ||
                                cardTags.includes(searchTerm);

            const tagMatch = activeTagFilter === 'all' || cardTags.includes(activeTagFilter);

            return searchMatch && tagMatch;
        });

        if (currentFilteredVideos.length === 0) {
            noVideosFoundMessage.style.display = 'block';
            videoContainer.style.display = 'none'; // Hide container if no videos
        } else {
            noVideosFoundMessage.style.display = 'none';
            videoContainer.style.display = 'flex'; // Bulma columns is-multiline uses flex
        }
        
        renderPaginationControls();
        showPage(1); // Go to first page of new filtered results
    }

    function showPage(pageNumber) {
        currentPage = pageNumber;
        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);

        // Hide all video cards first
        allVideoCards.forEach(card => card.style.display = 'none');

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const pageVideos = currentFilteredVideos.slice(startIndex, endIndex);

        pageVideos.forEach(card => card.style.display = 'block'); // Or 'flex' if your column needs it

        // Update pagination link states
        Array.from(paginationList.querySelectorAll('.pagination-link')).forEach(link => {
            link.classList.remove('is-current');
            if (parseInt(link.textContent) === currentPage) {
                link.classList.add('is-current');
                link.setAttribute('aria-current', 'page');
            }
        });

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages || totalPages === 0;
    }

    function renderPaginationControls() {
        paginationList.innerHTML = ''; // Clear existing page numbers
        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) {
            paginationNav.style.display = 'none';
            return;
        }
        paginationNav.style.display = 'flex'; // Or 'block' or 'table' as per Bulma's pagination

        // Simplified: Show all page numbers. For many pages, you might want ellipsis.
        for (let i = 1; i <= totalPages; i++) {
            const pageLinkLi = document.createElement('li');
            const pageLinkA = document.createElement('a');
            pageLinkA.classList.add('pagination-link');
            pageLinkA.textContent = i;
            pageLinkA.setAttribute('aria-label', `Goto page ${i}`);
            if (i === currentPage) { // currentPage should be 1 initially here
                pageLinkA.classList.add('is-current');
                pageLinkA.setAttribute('aria-current', 'page');
            }
            pageLinkA.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(i);
            });
            pageLinkLi.appendChild(pageLinkA);
            paginationList.appendChild(pageLinkLi);
        }
    }

    // Event Listeners
    if (videoSearchInput) {
        videoSearchInput.addEventListener('input', applyFiltersAndPaginate);
    }

    tagFilterElements.forEach(tag => {
        tag.addEventListener('click', function() {
            tagFilterElements.forEach(t => t.classList.remove('is-active'));
            this.classList.add('is-active');
            applyFiltersAndPaginate();
        });
    });

    prevButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    // Initial setup
    if (allVideoCards.length > 0) {
        applyFiltersAndPaginate(); // This will also call showPage(1)
    } else {
        paginationNav.style.display = 'none';
        noVideosFoundMessage.textContent = 'No videos available at the moment.';
        noVideosFoundMessage.style.display = 'block';
        videoContainer.style.display = 'none';
    }
});
</script>