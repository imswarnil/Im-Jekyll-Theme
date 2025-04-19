---
permalink: "/sw.js"
layout: null
sitemap: false
---

const version = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const cacheName = `static::${version}`;

const buildContentBlob = () => {
  return [
    {%- for post in site.posts limit: 10 -%}
      "{{ post.url | relative_url }}",
    {%- endfor -%}
    {%- for page in site.pages -%}
      {%- unless page.url contains 'sw.js' or page.url contains '404.html' -%}
        "{{ page.url | relative_url }}",
      {%- endunless -%}
    {%- endfor -%}
    "{{ site.baseurl }}/offline.html",
    "{{ site.baseurl }}/assets/default-offline-image.png",
    "{{ site.baseurl }}/assets/scripts/fetch.js",
    "{{ site.logo | relative_url }}"
  ];
};

const updateStaticCache = () => {
  return caches.open(cacheName).then(async cache => {
    const urls = buildContentBlob().filter(Boolean);
    await Promise.all(
      urls.map(url =>
        cache.add(url).catch(err => console.warn(`Failed to cache: ${url}`, err))
      )
    );
  });
};

const clearOldCache = () => {
  return caches.keys().then(keys => {
    return Promise.all(
      keys
        .filter(key => key !== cacheName)
        .map(key => {
          console.log(`Service Worker: removing cache ${key}`);
          return caches.delete(key);
        })
    );
  });
};

self.addEventListener("install", event => {
  event.waitUntil(
    updateStaticCache().then(() => {
      console.log(`Service Worker: cache updated to version: ${cacheName}`);
      self.skipWaiting();
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    clearOldCache().then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // Only deal with requests from the same origin
  if (url.origin !== location.origin) {
    return;
  }

  // Always fetch non-GET requests from the network
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Fallbacks
  let fallbackAsset = "{{ site.baseurl }}/offline.html";

  if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    fallbackAsset = "{{ site.baseurl }}/assets/default-offline-image.png";
  }

  // Try network, then cache, then fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        // Cache response if valid
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cacheResponse => {
          return cacheResponse || caches.match(fallbackAsset);
        });
      })
  );
});
