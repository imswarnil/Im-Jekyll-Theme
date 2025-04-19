---
permalink: /assets/scripts/sw.js
layout: null
sitemap: false
---

const version = '{{ site.time | date: '%Y%m%d%H%M%S' }}';
const cacheName = `static::${version}`;
const offlinePageUrl = '/offline/';
const offlineImageUrl = '{{ site.baseurl }}/assets/default-offline-image.png';

const buildContentBlob = () => {
  const assets = new Set([
    '/',
    offlinePageUrl,
    offlineImageUrl,
    '{{ site.logo | relative_url }}',
    '{{ "/assets/scripts/fetch.js" | relative_url }}', // Including the fetch polyfill
    // Add other essential assets like main CSS if needed:
    // '{{ "/assets/styles.css" | relative_url }}',

    {%- for post in site.posts limit: 10 -%}
      '{{ post.url | relative_url }}',
    {%- endfor -%}
    {%- for page in site.pages -%}
      {%- assign page_url_rel = page.url | relative_url -%}
      {%- unless page_url_rel contains '/assets/scripts/sw.js' or page_url_rel contains '404.html' or page_url_rel == offlinePageUrl -%}
        '{{ page_url_rel }}',
      {%- endunless -%}
    {%- endfor -%}
  ]);
  return Array.from(assets);
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(buildContentBlob()))
      .then(() => self.skipWaiting())
      .catch(error => console.error('[SW Install Error]', error))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.startsWith('static::') && key !== cacheName)
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .catch(async () => {
        const cache = await caches.open(cacheName); // Open the specific cache
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        let fallbackUrl;
        const acceptHeader = request.headers.get('Accept') || '';

        if (acceptHeader.includes('text/html')) {
          fallbackUrl = offlinePageUrl;
        } else if (acceptHeader.includes('image')) {
          fallbackUrl = offlineImageUrl;
        }

        if (fallbackUrl) {
          const fallbackResponse = await cache.match(fallbackUrl); // Match fallback in the same cache
          if (fallbackResponse) {
            return fallbackResponse;
          }
        }

        // Final fallback if specific one not found or not applicable
        return new Response("Offline content not available.", {
          status: 404,
          statusText: "Offline content not available.",
          headers: { 'Content-Type': 'text/plain' }
        });
      })
  );
});