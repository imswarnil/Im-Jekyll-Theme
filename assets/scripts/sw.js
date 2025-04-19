---
permalink: "/sw.js"
layout: null
sitemap: false
---

const version = '{{ site.time | date: '%Y%m%d%H%M%S' }}';
const staticCacheName = `static::${version}`; // Cache for assets defined at build time

// Define core fallback assets
const offlinePageUrl = '/offline/'; // Your offline page URL
const offlineImageUrl = '{{ site.baseurl }}/assets/default-offline-image.png'; // Your default offline image

// Function to build the list of assets to precache
const buildContentBlob = () => {
  // Use a Set to avoid duplicates automatically
  const assets = new Set([
    '/', // Cache the root URL
    offlinePageUrl,
    offlineImageUrl,
    "{{ site.logo | relative_url }}",
    "{{ site.baseurl }}/assets/scripts/fetch.js" // Fetch polyfill if needed
    // Add other essential static assets here: main CSS, main JS etc.
    // e.g., "{{ site.baseurl }}/assets/css/main.css",
  ]);

  // Add recent posts
  {% for post in site.posts limit: 10 %}
    assets.add("{{ post.url | relative_url }}");
  {% endfor %}

  // Add pages (excluding SW, 404, and potentially others you don't want offline initially)
  {% for page in site.pages %}
    {% unless page.url contains 'sw.js' or page.url contains '404.html' or page.url == offlinePageUrl %}
      assets.add("{{ page.url | relative_url }}");
    {% endunless %}
  {% endfor %}

  // Convert Set back to Array for cache.addAll
  return Array.from(assets);
};

const assetsToPrecache = buildContentBlob();

// --- Service Worker Lifecycle Events ---

// INSTALL: Precache essential assets
self.addEventListener("install", event => {
  console.log(`[SW] Attempting to install version: ${version}`);
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        console.log(`[SW] Caching assets for ${staticCacheName}:`, assetsToPrecache);
        return cache.addAll(assetsToPrecache);
      })
      .then(() => {
        console.log(`[SW] Installation complete for ${staticCacheName}. Activating immediately.`);
        // Force the waiting service worker to become the active service worker.
        return self.skipWaiting();
      })
      .catch(error => {
        console.error("[SW] Installation failed:", error);
      })
  );
});

// ACTIVATE: Clean up old caches
self.addEventListener("activate", event => {
  console.log(`[SW] Activating version: ${version}`);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => {
            // Delete caches that are prefixed with 'static::' but are not the current version
            return key.startsWith('static::') && key !== staticCacheName;
          })
          .map(key => {
            console.log(`[SW] Deleting old static cache: ${key}`);
            return caches.delete(key);
          })
      );
    }).then(() => {
      console.log(`[SW] Activation complete for ${version}. Taking control.`);
      // Take control of uncontrolled clients (tabs) immediately
      return self.clients.claim();
    })
  );
});

// --- Fetch Event Handling ---

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // --- Filter Requests ---
  // 1. Only handle GET requests
  if (request.method !== "GET") {
    // Let the browser handle non-GET requests
    // console.log(`[SW] Ignoring non-GET request: ${request.method} ${url.pathname}`);
    return;
  }
  // 2. Only handle requests from the same origin (your site)
  if (url.origin !== self.location.origin) {
    // Let the browser handle cross-origin requests (e.g., Google Fonts, Analytics)
    // console.log(`[SW] Ignoring cross-origin request: ${url.origin}`);
    return;
  }

  // --- Caching Strategy: Network falling back to Cache, then Offline Fallback ---
  // This strategy prioritizes fresh content but provides offline support.

  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        // console.log(`[SW] Serving from network: ${request.url}`);
        // Optional: Could implement dynamic caching here for assets not precached
        // e.g., cache successful responses in a separate 'runtime' cache
        return networkResponse;
      })
      .catch(async (error) => {
        console.log(`[SW] Network request failed for ${request.url}. Trying cache... Error:`, error);

        // 1. Try to get the response from the cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          console.log(`[SW] Serving from cache: ${request.url}`);
          return cachedResponse;
        }

        // 2. If not in cache, try to return a specific offline fallback
        console.log(`[SW] Not found in cache: ${request.url}. Trying fallback...`);

        // Determine the correct fallback based on the 'Accept' header
        let fallbackUrl;
        const acceptHeader = request.headers.get('Accept') || '';

        if (acceptHeader.includes('text/html')) {
          fallbackUrl = offlinePageUrl;
        } else if (acceptHeader.includes('image')) {
          fallbackUrl = offlineImageUrl;
        }
        // Add more specific fallbacks if needed (e.g., for CSS, JS)

        if (fallbackUrl) {
          // IMPORTANT: Match the fallback from the STATIC cache where it was precached
          // Use ignoreSearch: true if query parameters shouldn't affect the match
          const fallbackResponse = await caches.match(fallbackUrl, { cacheName: staticCacheName, ignoreSearch: true });
          if (fallbackResponse) {
            console.log(`[SW] Serving fallback ${fallbackUrl} for: ${request.url}`);
            return fallbackResponse;
          } else {
            // This really shouldn't happen if precaching worked and the URL is correct
            console.error(`[SW] CRITICAL: Fallback asset ${fallbackUrl} not found in cache ${staticCacheName}!`);
            // Return a generic error response as a last resort
            return new Response("Network error and offline fallback unavailable.", {
              status: 503, // Service Unavailable
              statusText: "Service Unavailable",
              headers: { 'Content-Type': 'text/plain' }
            });
          }
        }

        // 3. If no specific fallback defined for this request type, just return a generic error
        console.warn(`[SW] No specific fallback configured for ${request.url} (Accept: ${acceptHeader}).`);
        return new Response("Network error. Resource not available offline.", {
          status: 404, // Not Found (as it's neither online nor cached/fallback)
          statusText: "Not Found",
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});
