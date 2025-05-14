---
layout: default
title: "All Videos"
permalink: /videos/  # This will create /videos/index.html
items_per_page: 6 # Number of videos per page, adjust as needed
# SEO meta tags if needed
description: "Browse our complete library of video tutorials and content."
---

<section class="hero is-primary is-small">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-vcentered">
                <div class="column is-auto">
                    <h1 class="title is-1">
                        My Video Library
                    </h1>
                    <h2 class="subtitle is-4">
                        Learn, create and grow with our video tutorials
                    </h2>
                </div>
                <div class="column is-auto has-text-right">
                    <!-- Optional: Ad or Call to Action -->
                </div>
            </div>
        </div>
    </div>
</section>

<section class="section pt-4 pb-2">
    <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="{{ '/' | relative_url }}"><i class="fas fa-home mr-2"></i>Home</a></li>
                <li class="is-active"><a href="{{ page.url | relative_url }}" aria-current="page">All Videos</a></li>
            </ul>
        </nav>
    </div>
</section>

<section class="section pt-2">
    <div class="container">
        <div class="columns">
            <!-- Main Video Listing (Responsive) -->
            <div class="column is-three-quarters-desktop is-full-tablet">
                <!-- Search and Filters -->
                <div class="box mb-5">
                    <div class="field">
                        <label class="label" for="videoSearch">Search Videos</label>
                        <div class="control has-icons-left">
                            <input class="input is-medium" type="text" placeholder="e.g., 'editing tips', 'beginner guide'..." id="videoSearch">
                            <span class="icon is-left">
                                <i class="fas fa-search"></i>
                            </span>
                        </div>
                    </div>

                    {% assign all_video_tags = "" | split: "" %}
                    {% for video_item in site.videos %}
                        {% for tag in video_item.tags %}
                            {% unless all_video_tags contains tag %}
                                {% assign all_video_tags = all_video_tags | push: tag %}
                            {% endunless %}
                        {% endfor %}
                    {% endfor %}
                    {% assign all_video_tags = all_video_tags | uniq | sort %}

                    {% if all_video_tags.size > 0 %}
                    <div class="field mt-4">
                        <label class="label">Filter by Tag</label>
                        <div class="field is-grouped is-grouped-multiline tag-filter-container">
                            <div class="control">
                                <button class="button is-small filter-tag is-light is-active" data-filter="all">
                                    <span class="icon is-small"><i class="fas fa-tags"></i></span>
                                    <span>All Tags ({{ site.videos.size }})</span>
                                </button>
                            </div>
                            {% for tag in all_video_tags %}
                            {% assign tag_videos_count = site.videos | where_exp: "video", "video.tags contains tag" | size %}
                            {% if tag_videos_count > 0 %}
                            <div class="control">
                                <button class="button is-small filter-tag is-light" data-filter="{{ tag | slugify }}">
                                    {{ tag }} ({{ tag_videos_count }})
                                </button>
                            </div>
                            {% endif %}
                            {% endfor %}
                        </div>
                    </div>
                    {% endif %}
                </div>

                <!-- Video Grid -->
                <div class="columns is-multiline" id="videoGridContainer">
                    {% for video in site.videos %}
                    <div class="column is-one-third-desktop is-half-tablet video-card-wrapper"
                         data-title="{{ video.title | downcase | escape }}"
                         data-description="{{ video.description | default: '' | downcase | escape }}"
                         data-tags="{% for tag in video.tags %}{{ tag | slugify }} {% endfor %}"
                         style="display: none;" {% comment %}Initially hidden for JS pagination & filtering{% endcomment %}>
                        <a href="{{ video.url | relative_url }}" class="video-card-link" aria-label="Watch {{ video.title | escape }}">
                            <div class="card is-shadowless is-fullheight">
                                <div class="card-image">
                                    <figure class="image is-16by9 video-thumbnail">
                                        <img src="https://img.youtube.com/vi/{{ video.VideoId }}/mqdefault.jpg" 
                                             srcset="https://img.youtube.com/vi/{{ video.VideoId }}/mqdefault.jpg 320w, https://img.youtube.com/vi/{{ video.VideoId }}/hqdefault.jpg 480w, https://img.youtube.com/vi/{{ video.VideoId }}/sddefault.jpg 640w"
                                             sizes="(max-width: 768px) 50vw, 33vw"
                                             alt="Thumbnail for {{ video.title | escape }}" loading="lazy">
                                        {% if video.duration %}
                                        <span class="video-duration-badge">{{ video.duration }}</span>
                                        {% endif %}
                                        <div class="video-play-overlay">
                                            <span class="icon is-large"><i class="fas fa-play-circle fa-3x"></i></span>
                                        </div>
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="content">
                                        <p class="title is-5 video-title mb-2">{{ video.title }}</p>
                                        <p class="subtitle is-7 video-meta has-text-grey">
                                            {% if video.author %}<span>By {{ video.author }}</span>{% endif %}
                                            {% if video.date %}<span class="is-pulled-right"><time datetime="{{ video.date | date_to_xmlschema }}">{{ video.date | date: "%b %-d, %Y" }}</time></span>{% endif %}
                                        </p>
                                        {% if video.description %}
                                        <p class="is-size-6 video-description">{{ video.description | truncatewords: 15 }}</p>
                                        {% endif %}
                                    </div>
                                </div>
                                {% if video.tags.size > 0 %}
                                <footer class="card-footer video-tags-footer">
                                    <div class="tags are-small card-footer-item is-flex-wrap-wrap is-justify-content-flex-start">
                                        {% for tag in video.tags limit:3 %}
                                        <span class="tag is-light">{{ tag }}</span>
                                        {% endfor %}
                                    </div>
                                </footer>
                                {% endif %}
                            </div>
                        </a>
                    </div>
                    {% endfor %}
                </div>

                <div id="noVideosFoundMessage" class="notification is-warning has-text-centered" style="display: none; margin: 2rem 0;">
                    <p class="is-size-5">No videos match your current search or filter criteria.</p>
                </div>

                <!-- Pagination -->
                <nav id="videoPaginationControls" class="pagination is-centered is-rounded mt-5" role="navigation" aria-label="pagination" style="display: none;">
                    <a class="pagination-previous" title="Previous page" disabled><i class="fas fa-chevron-left"></i>  Previous</a>
                    <a class="pagination-next" title="Next page" disabled>Next page  <i class="fas fa-chevron-right"></i></a>
                    <ul class="pagination-list">
                        <!-- JS will populate this -->
                    </ul>
                </nav>
            </div>

            <!-- Sidebar -->
            <div class="column is-one-quarter-desktop is-full-tablet">
                <aside class="menu sticky-sidebar p-4 box">
                    <p class="menu-label">
                        Categories
                    </p>
                    <ul class="menu-list">
                        <li><a class="filter-tag-sidebar" data-filter="all">All Videos</a></li>
                        {% for tag in all_video_tags %}
                        {% assign tag_videos_count = site.videos | where_exp: "video", "video.tags contains tag" | size %}
                        {% if tag_videos_count > 0 %}
                        <li><a class="filter-tag-sidebar" data-filter="{{ tag | slugify }}">{{ tag }} ({{tag_videos_count }})</a></li>
                        {% endif %}
                        {% endfor %}
                    </ul>
                    <p class="menu-label mt-5">
                        Popular Videos
                    </p>
                    <ul class="menu-list">
                        {% assign popular_videos = site.videos | sort: 'views' | reverse | limit: 5 %}
                        {% for video in popular_videos %}
                        <li>
                            <a href="{{ video.url | relative_url }}" title="{{ video.title | escape }}">
                                <div class="columns is-mobile is-vcentered">
                                    <div class="column is-narrow">
                                        <figure class="image is-48x48">
                                            <img src="https://img.youtube.com/vi/{{ video.VideoId }}/default.jpg" alt="" style="border-radius: 4px;">
                                        </figure>
                                    </div>
                                    <div class="column">
                                        <span class="is-size-7 has-text-weight-semibold">{{ video.title | truncatewords: 5 }}</span><br>
                                        <small class="has-text-grey-light">{{ video.views | default: 0 }} views</small>
                                    </div>
                                </div>
                            </a>
                        </li>
                        {% endfor %}
                    </ul>
                </aside>
            </div>
        </div>
    </div>
</section>

<style>
    .video-card-link {
        display: block;
        text-decoration: none;
        color: inherit;
        height: 100%;
    }
    .video-card-link .card {
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .video-card-link:hover .card,
    .video-card-link:focus .card {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.15);
    }
    .video-thumbnail {
        position: relative;
        overflow: hidden;
        border-top-left-radius: inherit;
        border-top-right-radius: inherit;
    }
    .video-thumbnail img {
        transition: transform 0.5s ease;
    }
    .video-card-link:hover .video-thumbnail img,
    .video-card-link:focus .video-thumbnail img {
        transform: scale(1.1);
    }
    .video-duration-badge {
        position: absolute;
        bottom: 8px;
        right: 8px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 0.2em 0.5em;
        font-size: 0.75rem;
        border-radius: 3px;
        z-index: 1;
    }
    .video-play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: white;
    }
    .video-card-link:hover .video-play-overlay,
    .video-card-link:focus .video-play-overlay {
        opacity: 1;
    }
    .video-card-wrapper[style*="display: none"] {
        padding: 0 !important; /* Override Bulma column padding */
        margin: 0 !important;
        border: none !important;
        height: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
    }
    .card.is-fullheight {
        height: 100%;
    }
    .card-content {
        flex-grow: 1; /* Pushes footer down */
    }
    .video-tags-footer {
        border-top: 1px solid #eee;
        padding: 0.75rem; /* Consistent with card-footer-item padding */
    }
    .video-tags-footer .tags {
        margin-bottom: 0; /* Override Bulma tags margin */
    }
    .tag-filter-container .button.is-active {
        background-color: hsl(217, 71%, 53%); /* Bulma primary */
        color: white;
        font-weight: bold;
    }
    .sticky-sidebar {
        position: -webkit-sticky; /* Safari */
        position: sticky;
        top: 1.5rem; /* Adjust based on your navbar height */
    }
    .menu-list a:hover, .menu-list a.is-active {
        background-color: #f5f5f5;
    }
</style>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const ITEMS_PER_PAGE = parseInt("{{ page.items_per_page }}", 10);
    const allVideoCards = Array.from(document.querySelectorAll('#videoGridContainer .video-card-wrapper'));
    const videoSearchInput = document.getElementById('videoSearch');
    const tagFilterButtons = document.querySelectorAll('.filter-tag'); // For main filter area
    const sidebarTagLinks = document.querySelectorAll('.filter-tag-sidebar'); // For sidebar links
    const videoGridContainer = document.getElementById('videoGridContainer');
    const noVideosFoundMessageEl = document.getElementById('noVideosFoundMessage');

    const paginationControlsEl = document.getElementById('videoPaginationControls');
    const paginationListEl = paginationControlsEl.querySelector('.pagination-list');
    const prevButtonEl = paginationControlsEl.querySelector('.pagination-previous');
    const nextButtonEl = paginationControlsEl.querySelector('.pagination-next');

    let currentFilteredVideos = [];
    let currentPage = 1;
    const baseVideoPath = "{{ page.url | remove: 'index.html' | relative_url }}"; // e.g., /videos/

    // Function to get page number from URL (e.g., /videos/page/2/)
    function getPageFromUrl() {
        const path = window.location.pathname;
        const pageMatch = path.match(new RegExp(`^${baseVideoPath.replace(/\/$/, '')}\/page\/(\\d+)\/?$`));
        if (pageMatch && pageMatch[1]) {
            const pageNum = parseInt(pageMatch[1], 10);
            return pageNum > 0 ? pageNum : 1;
        }
        return 1; // Default to page 1
    }

    // Function to update URL in address bar
    function updateBrowserUrl(pageNumber) {
        let newPath;
        if (pageNumber === 1) {
            newPath = baseVideoPath;
        } else {
            newPath = `${baseVideoPath}page/${pageNumber}/`.replace(/\/\//g, '/'); // Avoid double slashes
        }
        const currentPath = window.location.pathname.replace(/\/index\.html$/, '/'); // Normalize current path
        if (currentPath !== newPath) {
            history.pushState({ page: pageNumber, filter: getCurrentActiveFilter() }, `Page ${pageNumber}`, newPath);
        }
    }
    
    function getCurrentActiveFilter() {
        const activeFilterButton = document.querySelector('.filter-tag.is-active, .filter-tag-sidebar.is-active');
        return activeFilterButton ? activeFilterButton.dataset.filter : 'all';
    }

    // Main function to filter videos and then paginate
    function filterAndPaginateVideos(isInitialLoad = false) {
        const searchTerm = videoSearchInput.value.toLowerCase().trim();
        const activeFilter = getCurrentActiveFilter();

        currentFilteredVideos = allVideoCards.filter(card => {
            const title = card.dataset.title;
            const description = card.dataset.description;
            const cardTags = card.dataset.tags;

            const searchMatch = searchTerm === '' || title.includes(searchTerm) || description.includes(searchTerm);
            const tagMatch = activeFilter === 'all' || cardTags.includes(activeFilter);
            return searchMatch && tagMatch;
        });

        // Handle "no results" message
        if (currentFilteredVideos.length === 0) {
            noVideosFoundMessageEl.style.display = 'block';
            videoGridContainer.style.display = 'none'; // Hide grid
        } else {
            noVideosFoundMessageEl.style.display = 'none';
            videoGridContainer.style.display = 'flex'; // Show grid (Bulma columns is-multiline)
        }

        // Determine current page
        if (isInitialLoad) {
            currentPage = getPageFromUrl();
            const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);
            if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
            else if (currentPage > totalPages && totalPages === 0) currentPage = 1;
        } else {
            currentPage = 1; // Reset to page 1 on new filter/search
        }
        
        renderPaginationUI();
        displayCurrentPageVideos(isInitialLoad ? false : true); // Update URL on filter change, not initial history pop
    }

    // Function to display videos for the current page
    function displayCurrentPageVideos(shouldUpdateUrl = true) {
        allVideoCards.forEach(card => card.style.display = 'none'); // Hide all

        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);
        // Boundary checks for currentPage
        if (currentPage < 1 && totalPages > 0) currentPage = 1;
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        if (totalPages === 0) currentPage = 1;


        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const videosForPage = currentFilteredVideos.slice(startIndex, endIndex);

        videosForPage.forEach(card => card.style.display = 'block'); // Show cards for current page

        // Update pagination buttons state
        prevButtonEl.disabled = currentPage === 1;
        nextButtonEl.disabled = currentPage === totalPages || totalPages === 0;

        // Update .is-current on pagination links
        Array.from(paginationListEl.querySelectorAll('.pagination-link')).forEach(link => {
            link.classList.remove('is-current');
            if (parseInt(link.getAttribute('aria-label').split(' ').pop()) === currentPage) {
                link.classList.add('is-current');
            }
        });
        
        if (shouldUpdateUrl) {
            updateBrowserUrl(currentPage);
        }
        document.title = `All Videos${currentPage > 1 ? ` - Page ${currentPage}` : ''}`;
    }

    // Function to build pagination controls
    function renderPaginationUI() {
        paginationListEl.innerHTML = ''; // Clear old links
        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);

        if (totalPages <= 1) {
            paginationControlsEl.style.display = 'none';
            return;
        }
        paginationControlsEl.style.display = 'flex';

        // Simplified pagination: first, prev, current, next, last. More complex logic for more page numbers.
        // For now, let's show a few pages around current and ellipsis
        let pageNumbersToShow = [];
        const maxPagesToShow = 5; // Max number of direct page links

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) pageNumbersToShow.push(i);
        } else {
            pageNumbersToShow.push(1); // Always show first page
            if (currentPage > 3) pageNumbersToShow.push('...');
            
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 2) endPage = Math.min(totalPages -1, 3);
            if (currentPage >= totalPages -1) startPage = Math.max(2, totalPages -2);


            for (let i = startPage; i <= endPage; i++) {
                if (!pageNumbersToShow.includes(i)) pageNumbersToShow.push(i);
            }

            if (currentPage < totalPages - 2 && endPage < totalPages -1) pageNumbersToShow.push('...');
            if (!pageNumbersToShow.includes(totalPages)) pageNumbersToShow.push(totalPages); // Always show last page
        }
        
        pageNumbersToShow.forEach(num => {
            const li = document.createElement('li');
            if (num === '...') {
                li.innerHTML = '<span class="pagination-ellipsis">…</span>';
            } else {
                const a = document.createElement('a');
                a.classList.add('pagination-link');
                a.textContent = num;
                a.setAttribute('aria-label', `Go to page ${num}`);
                a.href = (num === 1) ? baseVideoPath : `${baseVideoPath}page/${num}/`.replace(/\/\//g, '/');
                if (num === currentPage) {
                    a.classList.add('is-current');
                    a.setAttribute('aria-current', 'page');
                }
                a.addEventListener('click', e => {
                    e.preventDefault();
                    currentPage = num;
                    displayCurrentPageVideos(true);
                });
                li.appendChild(a);
            }
            paginationListEl.appendChild(li);
        });
    }

    // Event Listeners
    videoSearchInput.addEventListener('input', () => filterAndPaginateVideos(false));

    function setActiveTag(clickedElement) {
        // Remove active class from all main and sidebar filters
        tagFilterButtons.forEach(btn => btn.classList.remove('is-active'));
        sidebarTagLinks.forEach(link => link.classList.remove('is-active'));
        
        // Add active class to the clicked element
        clickedElement.classList.add('is-active');

        // Sync corresponding element if it exists
        const filterValue = clickedElement.dataset.filter;
        tagFilterButtons.forEach(btn => {
            if (btn.dataset.filter === filterValue && btn !== clickedElement) btn.classList.add('is-active');
        });
        sidebarTagLinks.forEach(link => {
            if (link.dataset.filter === filterValue && link !== clickedElement) link.classList.add('is-active');
        });
    }

    tagFilterButtons.forEach(button => {
        button.addEventListener('click', function () {
            setActiveTag(this);
            filterAndPaginateVideos(false);
        });
    });
    sidebarTagLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            setActiveTag(this);
            filterAndPaginateVideos(false);
        });
    });

    prevButtonEl.addEventListener('click', e => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            displayCurrentPageVideos(true);
        }
    });

    nextButtonEl.addEventListener('click', e => {
        e.preventDefault();
        const totalPages = Math.ceil(currentFilteredVideos.length / ITEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            displayCurrentPageVideos(true);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function (event) {
        const restoredPage = (event.state && event.state.page) ? event.state.page : getPageFromUrl();
        const restoredFilter = (event.state && event.state.filter) ? event.state.filter : 'all';
        
        // Set the active filter based on popped state
        const elementToActivate = document.querySelector(`.filter-tag[data-filter="${restoredFilter}"], .filter-tag-sidebar[data-filter="${restoredFilter}"]`);
        if (elementToActivate) setActiveTag(elementToActivate);
        
        // Apply filters which will also set currentPage internally from URL
        filterAndPaginateVideos(true); // true for initial-like load to respect URL
    });
    

    // --- Initial Load ---
    // Check for sessionStorage redirect from 404 page
    if (sessionStorage.getItem('ghPagesSPA:redirect')) {
        const originalPath = sessionStorage.getItem('ghPagesSPA:redirect');
        sessionStorage.removeItem('ghPagesSPA:redirect');
        // If the original path is different from current and is a deep link, push it to history
        // This makes the URL reflect the intended deep link immediately
        if (originalPath !== window.location.pathname + window.location.search + window.location.hash) {
             const originalUrl = new URL(originalPath, window.location.origin); // Use originalPath for state
             const pageFromOriginalPath = getPageFromUrl(originalUrl.pathname); // Custom getPageFromUrl if needed
             history.replaceState({ page: pageFromOriginalPath, filter: 'all' }, '', originalUrl.pathname + originalUrl.search + originalUrl.hash);
        }
    }
    
    const initialFilter = getCurrentActiveFilter(); // Can be 'all' or set from other means
    const elementToActivate = document.querySelector(`.filter-tag[data-filter="${initialFilter}"], .filter-tag-sidebar[data-filter="${initialFilter}"]`);
    if(elementToActivate) setActiveTag(elementToActivate);
    
    filterAndPaginateVideos(true); // True for initial load, respects URL
});
</script>