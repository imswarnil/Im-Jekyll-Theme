---
    layout: null # Keep this front matter
sitemap: false
---
const version = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const CACHE_NAME = `static-cache-v${version}`;
const OFFLINE_URL = '{{ "/offline/" | relative_url }}'; // Use relative_url for baseurl compatibility
const OFFLINE_IMAGE = '{{ "/assets/default-offline-image.png" | relative_url }}'; // Ensure this path is correct

// Files to pre-cache during installation
// Use relative_url filter for baseurl compatibility
const urlsToCache = [
    // Core Pages & Manifest
    '{{ "/" | relative_url }}', // Root page
    '{{ "/manifest.json" | relative_url }}', // Manifest
    OFFLINE_URL, // Offline fallback page MUST be cached

    // === Add Core Assets ===
    // Adjust these paths based on your actual site structure!
    '{{ "/assets/css/main.css" | relative_url }}', // Example main CSS
    // Add other critical CSS files

    // === Add Core JS ===
    '{{ "/assets/scripts/fetch.js" | relative_url }}', // Your fetch polyfill
    // '{{ "/assets/js/main.js" | relative_url }}', // Example main JS
    // Add other critical JS files

    // === Add Favicons/Icons (Dynamically if configured in _config.yml) ===
    {% if site.favicons -%}
{% for icon in site.favicons -%}
'{{ site.baseurl }}/assets/icons/icon-{{ icon[0] }}x{{ icon[0] }}.png', // Assuming icons are in /assets/icons/
    {% endfor %}
{% else %}
// OR add manually if not using site.favicons for this
'{{ "/assets/icons/icon-192x192.png" | relative_url }}',
    '{{ "/assets/icons/icon-512x512.png" | relative_url }}',
    {% endif %}
'{{ "/favicon.ico" | relative_url }}', // Standard favicon
    // '{{ "/assets/icons/apple-touch-icon.png" | relative_url }}', // Apple touch icon

    // === Offline Image ===
    OFFLINE_IMAGE, // Cache the fallback image

    // === Dynamically Cache Pages/Posts (Careful with large sites) ===
    // Cache latest 10 posts (as per your original)
    {% for post in site.posts limit: 10 %}
'{{ post.url | relative_url }}',
    {% endfor %}

// Cache essential pages (adjust the 'unless' conditions as needed)
{% for page in site.html_pages %}
{% unless page.url contains 'sw.js' or page.url contains '404.html' or page.url == OFFLINE_URL %}
'{{ page.url | relative_url }}',
    {% endunless %}
{% endfor %}

  // Add other essential files/pages manually if needed
  // '{{ "/about/" | relative_url }}',
];

console.log(`[SW] Pre-caching ${urlsToCache.length} files for version ${version}`);

// --- Service Worker Event Listeners ---

// 1. Install Event: Pre-cache assets
self.addEventListener('install', event => {
    console.log('[SW] Event: install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log(`[SW] Caching core assets: ${CACHE_NAME}`);
                // Cache the OFFLINE_URL first separately to ensure it's there
                return cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))
                    .then(() => {
                        console.log('[SW] Offline page cached.');
                        return cache.addAll(urlsToCache);
                    })
                    .then(() => {
                        console.log('[SW] All core assets cached.');
                    });
            })
            .then(() => {
                console.log('[SW] Skip waiting on install');
                // Force the waiting service worker to become the active service worker.
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[SW] Caching failed during install:', error);
            })
    );
});

// 2. Activate Event: Clean up old caches
self.addEventListener('activate', event => {
    console.log('[SW] Event: activate');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName.startsWith('static-cache-')) { // Target only our caches
                        console.log('[SW] Removing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
            .then(() => {
                console.log('[SW] Old caches removed.');
                // Tell the active service worker to take control of the page immediately.
                return self.clients.claim();
            })
            .then(() => {
                console.log('[SW] Claimed clients.');
            })
            .catch(error => {
                console.error('[SW] Activation failed:', error);
            })
    );
});

// 3. Fetch Event: Serve cached content when offline or use cache-first for assets
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    // --- Debugging ---
    // console.log(`[SW] Event: fetch - Requesting: ${url.pathname}`);

    // Ignore non-GET requests
    if (request.method !== 'GET') {
        // console.log(`[SW] Ignoring non-GET request: ${request.method} ${url.pathname}`);
        return;
    }

    // Ignore requests to other origins (e.g., Google Analytics, external APIs)
    if (url.origin !== location.origin) {
        // console.log(`[SW] Ignoring cross-origin request: ${url.origin}`);
        return;
    }

    // --- Strategy: Network falling back to Cache, then Offline page (for HTML navigation) ---
    if (request.mode === 'navigate' || request.headers.get('Accept').includes('text/html')) {
        console.log(`[SW] Handling navigation request: ${url.pathname}`);
        event.respondWith(
            fetch(request)
                .then(response => {
                    // console.log(`[SW] Network success for: ${url.pathname}`);
                    // Optional: Cache the fetched page dynamically? Be careful with cache size.
                    // if (response.ok) {
                    //   const resClone = response.clone();
                    //   caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
                    // }
                    return response;
                })
                .catch(error => {
                    console.warn(`[SW] Network failed for navigation: ${url.pathname}. Error: ${error}. Trying cache...`);
                    return caches.match(request)
                        .then(cachedResponse => {
                            if (cachedResponse) {
                                console.log(`[SW] Serving from cache: ${url.pathname}`);
                                return cachedResponse;
                            }
                            // If not in cache, serve the offline page
                            console.warn(`[SW] Not in cache: ${url.pathname}. Serving offline page.`);
                            return caches.match(OFFLINE_URL);
                        });
                })
        );
        return; // Important: exit after handling navigation
    }

    // --- Strategy: Cache falling back to Network (for assets like CSS, JS, Images) ---
    // console.log(`[SW] Handling asset request: ${url.pathname}`);
    event.respondWith(
        caches.match(request)
            .then(cachedResponse => {
                // Cache hit - return response
                if (cachedResponse) {
                    // console.log(`[SW] Asset cache hit: ${url.pathname}`);
                    return cachedResponse;
                }

                // Cache miss - fetch from network
                // console.log(`[SW] Asset cache miss, fetching from network: ${url.pathname}`);
                return fetch(request)
                    .then(networkResponse => {
                        // Optional: Cache the newly fetched asset dynamically
                        if (networkResponse && networkResponse.status === 200) {
                            // console.log(`[SW] Caching fetched asset: ${url.pathname}`);
                            const responseToCache = networkResponse.clone(); // Clone response before caching
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(request, responseToCache);
                                });
                        } else if (!networkResponse || networkResponse.status !== 200) {
                            console.warn(`[SW] Network fetch for asset failed or non-200: ${url.pathname} Status: ${networkResponse?.status}`);
                        }
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error(`[SW] Asset network fetch failed: ${url.pathname}. Error: ${error}`);
                        // Specific fallback for images if network fails after cache miss
                        if (request.destination === 'image') {
                            console.warn(`[SW] Serving offline image for failed image request: ${url.pathname}`);
                            return caches.match(OFFLINE_IMAGE);
                        }
                        // For other assets (CSS, JS), return nothing or a generic error response
                        // Returning nothing might be better than returning the offline HTML page here.
                        return new Response(`Asset ${url.pathname} not available offline.`, { status: 404, statusText: "Not Found" });
                    });
            })
    );
});

console.log('[SW] Service Worker script loaded.');

// Note on fetch.js: Modern browsers have excellent fetch support.
// You might only need the polyfill if you target very old browsers (like IE11).
// Consider removing it and its caching if not strictly necessary.