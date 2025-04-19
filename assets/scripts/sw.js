---
layout: null
permalink: /sw.js
sitemap: false
---

const LATEST_VERSION = '{{ site.time | date: '%Y%m%d%H%M%S' }}';
const STATIC_CACHE_NAME = `static::${LATEST_VERSION}`;
const DYNAMIC_CACHE_NAME = `dynamic::${LATEST_VERSION}`;

const OFFLINE_PAGE_URL = '/offline/';
const OFFLINE_IMAGE_URL = '{{ site.baseurl }}/assets/default-offline-image.png';

const EXCLUDED_URLS = [
  '/sw.js',
  '/manifest.json',
  '/404.html',
  '{{ OFFLINE_PAGE_URL }}',
  {% for url in site.sw_exclude_urls %}
  '{{ url | relative_url }}',
  {% endfor %}
];

const buildAssetsToPrecache = () => {
  const assets = new Set([
    '/',
    OFFLINE_PAGE_URL,
    OFFLINE_IMAGE_URL,
    '{{ site.logo | default: "/assets/icons/icon-192x192.png" | relative_url }}',
    '{{ "/assets/css/main.css" | relative_url }}', // Adjust path if needed
    '{{ "/assets/js/main.js" | relative_url }}',   // Adjust path if needed
    '{{ "/assets/scripts/fetch.js" | relative_url }}', // Fetch polyfill (see explanation above)

    {% assign posts_limit = site.sw_posts_limit | default: 10 %}
    {% for post in site.posts limit: posts_limit %}
      '{{ post.url | relative_url }}',
    {% endfor %}

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

    {% for icon in site.pwa_icons %}
      {% if icon[0] == 192 or icon[0] == 512 %}
      '{{ icon[1] | relative_url }}',
      {% endif %}
    {% endfor %}
    '{{ site.apple_touch_icon | relative_url }}'
  ]);

  return Array.from(assets);
};

const ASSETS_TO_PRECACHE = buildAssetsToPrecache();

self.addEventListener('install', event => {
  console.log(`[SW ${LATEST_VERSION}] Install`);
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log(`[SW ${LATEST_VERSION}] Precaching ${ASSETS_TO_PRECACHE.length} assets.`);
        return cache.addAll(ASSETS_TO_PRECACHE);
      })
      .then(() => {
        console.log(`[SW ${LATEST_VERSION}] Precache complete. Activating.`);
        return self.skipWaiting();
      })
      .catch(error => {
        console.error(`[SW ${LATEST_VERSION}] Precaching failed:`, error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log(`[SW ${LATEST_VERSION}] Activate`);
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log(`[SW ${LATEST_VERSION}] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log(`[SW ${LATEST_VERSION}] Old caches cleaned. Claiming clients.`);
        return self.clients.claim();
      })
      .catch(error => {
        console.error(`[SW ${LATEST_VERSION}] Activation failed:`, error);
      })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  const relativePath = url.pathname + url.search; // Include query params for matching

  // Strategy 1: Cache First for precached assets
  if (ASSETS_TO_PRECACHE.includes(url.pathname)) { // Check base path for precache list
    event.respondWith(
      caches.match(request, { cacheName: STATIC_CACHE_NAME })
        .then(cachedResponse => {
          return cachedResponse || fetch(request); // Fallback to network if somehow missing
        })
    );
    return;
  }

  // Strategy 2: Network Falling Back to Cache (then Offline)
  event.respondWith(
    caches.open(DYNAMIC_CACHE_NAME).then(dynamicCache => {
      return fetch(request)
        .then(networkResponse => {
          if (networkResponse.ok) {
             // Cache successful responses dynamically
             dynamicCache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          // Network failed, try caches then offline fallback
          const dynamicCachedResponse = await dynamicCache.match(request);
          if (dynamicCachedResponse) return dynamicCachedResponse;

          const staticCachedResponse = await caches.match(request, { cacheName: STATIC_CACHE_NAME });
          if (staticCachedResponse) return staticCachedResponse;

          // Serve offline fallback
          const acceptHeader = request.headers.get('Accept') || '';
          let fallbackUrl;
          if (acceptHeader.includes('text/html')) {
            fallbackUrl = OFFLINE_PAGE_URL;
          } else if (acceptHeader.includes('image')) {
            fallbackUrl = OFFLINE_IMAGE_URL;
          }

          if (fallbackUrl) {
             const fallbackResponse = await caches.match(fallbackUrl, { cacheName: STATIC_CACHE_NAME });
             if (fallbackResponse) return fallbackResponse;
          }

          // Generic fallback if specific one failed or wasn't applicable
          return new Response("Offline content not available.", {
             status: 404,
             statusText: "Offline content not available.",
             headers: { 'Content-Type': 'text/plain' }
           });
        });
    })
  );
});