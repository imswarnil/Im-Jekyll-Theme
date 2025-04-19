---
layout: null
permalink: /sw.js
sitemap: false
---

/* Configuration */
const LATEST_VERSION = '{{ site.time | date: '%Y%m%d%H%M%S' }}'; // Cache version based on build time
const STATIC_CACHE_NAME = `static::${LATEST_VERSION}`;
const DYNAMIC_CACHE_NAME = `dynamic::${LATEST_VERSION}`; // Separate cache for runtime assets

const OFFLINE_PAGE_URL = '/offline/'; // Path to your offline fallback page
const OFFLINE_IMAGE_URL = '{{ site.baseurl }}/assets/default-offline-image.png'; // Default offline image

// List of URLs to exclude from auto-caching (add from _config.yml)
const EXCLUDED_URLS = [
  '/sw.js',             // The service worker itself
  '/manifest.json',     // The manifest file
  '/404.html',          // Standard 404 page (offline handled differently)
  '{{ OFFLINE_PAGE_URL }}', // Exclude offline page from page list (added explicitly)
  {% for url in site.sw_exclude_urls %}
  '{{ url | relative_url }}',
  {% endfor %}
];

/*
  Assets to Precache
  These are downloaded and cached during the service worker installation.
  Critical for the initial offline experience.
*/
const buildAssetsToPrecache = () => {
  // Use a Set to prevent duplicates
  const assets = new Set([
    // --- Core App Shell ---
    '/', // Root path
    OFFLINE_PAGE_URL,
    OFFLINE_IMAGE_URL,
    '{{ site.logo | default: "/assets/icons/icon-192x192.png" | relative_url }}', // Site logo or default icon
    '{{ "/assets/css/main.css" | relative_url }}', // Your main stylesheet (Adjust path if needed)
    '{{ "/assets/js/main.js" | relative_url }}',   // Your main JavaScript (Adjust path if needed)
    '{{ "/assets/scripts/fetch.js" | relative_url }}', // Fetch polyfill if you included it

    // --- Jekyll Generated Content ---
    // Add recent posts
    {% assign posts_limit = site.sw_posts_limit | default: 10 %}
    {% for post in site.posts limit: posts_limit %}
      '{{ post.url | relative_url }}',
    {% endfor %}

    // Add pages (excluding specific ones)
    {% for page in site.pages %}
      {% assign page_url_rel = page.url | relative_url %}
      {% assign excluded = false %}
      {% for excluded_url in EXCLUDED_URLS %}
        {% if page_url_rel == excluded_url or page_url_rel contains excluded_url %}
          {% assign excluded = true %}
          {% break %}
        {% endif %}
      {% endfor %}
      {% unless excluded %}
        '{{ page_url_rel }}',
      {% endunless %}
    {% endfor %}

    // Add important icons from _config.yml (for offline usage or fallbacks)
    {% for icon in site.pwa_icons %}
      {% if icon[0] == 192 or icon[0] == 512 %}
      '{{ icon[1] | relative_url }}',
      {% endif %}
    {% endfor %}
    '{{ site.apple_touch_icon | relative_url }}'
  ]);

  // Convert Set back to Array for cache.addAll
  return Array.from(assets);
};

const ASSETS_TO_PRECACHE = buildAssetsToPrecache();


/* --- Service Worker Lifecycle Events --- */

// INSTALL: Cache critical assets
self.addEventListener('install', event => {
  console.log(`[SW ${LATEST_VERSION}] Install event fired.`);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log(`[SW ${LATEST_VERSION}] Precaching ${ASSETS_TO_PRECACHE.length} assets for static cache.`);
        // Use addAll - if one asset fails, the entire install fails.
        return cache.addAll(ASSETS_TO_PRECACHE);
      })
      .then(() => {
        console.log(`[SW ${LATEST_VERSION}] Static assets precached successfully. Activating now.`);
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error(`[SW ${LATEST_VERSION}] Precaching failed:`, error);
        // Optional: You might want to prevent activation if core assets fail
      })
  );
});

// ACTIVATE: Clean up old caches and take control
self.addEventListener('activate', event => {
  console.log(`[SW ${LATEST_VERSION}] Activate event fired.`);
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Delete caches that aren't the current static or dynamic cache
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log(`[SW ${LATEST_VERSION}] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log(`[SW ${LATEST_VERSION}] Old caches cleaned. Claiming clients.`);
        // Take control of uncontrolled clients (tabs) immediately
        return self.clients.claim();
      })
      .catch(error => {
        console.error(`[SW ${LATEST_VERSION}] Activation failed:`, error);
      })
  );
});

/* --- Fetch Event Handling --- */

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // --- Filter Requests ---
  // 1. Ignore non-GET requests
  if (request.method !== 'GET') {
    // console.debug(`[SW ${LATEST_VERSION}] Ignoring non-GET request: ${request.method} ${url.pathname}`);
    return; // Let the browser handle it
  }

  // 2. Ignore requests to different origins (unless you specifically want to cache them)
  if (url.origin !== self.location.origin) {
    // console.debug(`[SW ${LATEST_VERSION}] Ignoring cross-origin request: ${url.origin}`);
    return; // Let the browser handle it
  }

  // 3. Ignore specific paths if needed (e.g., admin areas, API endpoints not for caching)
  if (url.pathname.startsWith('/admin/')) { // Example
      // console.debug(`[SW ${LATEST_VERSION}] Ignoring admin path: ${url.pathname}`);
      return; // Let the browser handle it
  }


  // --- Caching Strategies ---

  // Strategy 1: Cache First (for precached static assets)
  // If the request URL is in our precached list, serve from cache immediately.
  // This is fast for the app shell and core assets.
  if (ASSETS_TO_PRECACHE.includes(url.pathname)) {
    // console.debug(`[SW ${LATEST_VERSION}] Strategy: Cache First for ${url.pathname}`);
    event.respondWith(
      caches.match(request, { cacheName: STATIC_CACHE_NAME })
        .then(cachedResponse => {
          if (cachedResponse) {
            // console.debug(`[SW ${LATEST_VERSION}] Serving from STATIC cache: ${request.url}`);
            return cachedResponse;
          }
          // This *shouldn't* happen for precached assets, but fallback just in case
          console.warn(`[SW ${LATEST_VERSION}] Precached asset not found in cache: ${request.url}. Fetching from network.`);
          return fetch(request);
        })
    );
    return; // Strategy handled
  }


  // Strategy 2: Network Falling Back to Cache (for dynamic content or non-critical assets)
  // Try network first. If successful, cache the response dynamically.
  // If network fails, serve from the DYNAMIC cache.
  // If not in DYNAMIC cache, serve the appropriate offline fallback.
  // console.debug(`[SW ${LATEST_VERSION}] Strategy: Network Falling Back to Cache for ${url.pathname}`);
  event.respondWith(
    caches.open(DYNAMIC_CACHE_NAME).then(dynamicCache => {
      return fetch(request)
        .then(networkResponse => {
          // If fetch is successful, cache the response (clone it first)
          // console.debug(`[SW ${LATEST_VERSION}] Serving from network & caching dynamically: ${request.url}`);
          // Only cache successful responses (status 2xx)
          if (networkResponse.ok) {
              dynamicCache.put(request, networkResponse.clone());
          } else {
              console.warn(`[SW ${LATEST_VERSION}] Network request succeeded but status was not OK (${networkResponse.status}): ${request.url}`);
          }
          return networkResponse;
        })
        .catch(async (error) => {
          console.log(`[SW ${LATEST_VERSION}] Network failed for ${request.url}. Trying cache... Error: ${error}`);

          // 1. Try the DYNAMIC cache first
          const dynamicCachedResponse = await dynamicCache.match(request);
          if (dynamicCachedResponse) {
            console.log(`[SW ${LATEST_VERSION}] Serving from DYNAMIC cache: ${request.url}`);
            return dynamicCachedResponse;
          }

          // 2. Try the STATIC cache as a last resort before offline fallback
          // (Might contain older versions of pages/posts if not updated)
          const staticCachedResponse = await caches.match(request, { cacheName: STATIC_CACHE_NAME });
           if (staticCachedResponse) {
            console.log(`[SW ${LATEST_VERSION}] Serving from STATIC cache (fallback): ${request.url}`);
            return staticCachedResponse;
          }

          // 3. Serve appropriate offline fallback from the STATIC cache
          console.log(`[SW ${LATEST_VERSION}] Not in any cache: ${request.url}. Serving offline fallback.`);
          const acceptHeader = request.headers.get('Accept') || '';
          let fallbackUrl;

          if (acceptHeader.includes('text/html')) {
            fallbackUrl = OFFLINE_PAGE_URL;
          } else if (acceptHeader.includes('image')) {
            fallbackUrl = OFFLINE_IMAGE_URL;
          }
          // Add more fallbacks if needed (e.g., specific JS/CSS)

          if (fallbackUrl) {
            const fallbackResponse = await caches.match(fallbackUrl, { cacheName: STATIC_CACHE_NAME });
            if (fallbackResponse) {
              console.log(`[SW ${LATEST_VERSION}] Serving fallback ${fallbackUrl} for: ${request.url}`);
              return fallbackResponse;
            } else {
              console.error(`[SW ${LATEST_VERSION}] CRITICAL: Fallback asset ${fallbackUrl} not found in STATIC cache!`);
              // Generic fallback if the specific offline asset isn't cached
              return new Response("Offline fallback not available.", { status: 503, statusText: "Offline Fallback Missing", headers: { 'Content-Type': 'text/plain' } });
            }
          }

          // 4. If no specific fallback matches, return a generic error
           console.warn(`[SW ${LATEST_VERSION}] No specific fallback for ${request.url} (Accept: ${acceptHeader}).`);
           return new Response("Network error and resource not cached.", { status: 404, statusText: "Not Found", headers: { 'Content-Type': 'text/plain' } });
        });
    })
  );
});


self.addEventListener('sync', event => {
  if (event.tag === 'sync-my-data') {
    console.log("[SW] Background sync triggered for 'sync-my-data'");
    event.waitUntil(
    syncMyDataToServer().then(() => console.log("[SW] Sync successful"))
           .catch(err => console.error("[SW] Sync failed", err))
    );
  }
});


self.addEventListener('push', event => {
  console.log('[SW] Push Received.');
  const data = event.data ? event.data.json() : { title: 'Default Title', body: 'Default body content.'};

  const title = data.title;
  const options = {
    body: data.body,
    icon: '{{ "/assets/icons/icon-192x192.png" | relative_url }}', // Default icon
    badge: '{{ "/assets/icons/badge-72x72.png" | relative_url }}', // Small badge icon
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  console.log('[SW] Notification click Received.');
  event.notification.close();
event.waitUntil(clients.openWindow('https://yourdomain.com/some/path'));
});