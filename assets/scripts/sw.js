---
permalink: "/sw.js"
layout: null
sitemap: false
---

const version = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const cacheName = `static-v${version}`;
const dynamicCacheName = `dynamic-v${version}`;
const OFFLINE_PAGE = "{{ '/offline/' | relative_url }}";
const OFFLINE_IMAGE = "{{ site.baseurl }}/assets/default-offline-image.png";

const ASSETS_TO_CACHE = [
  OFFLINE_PAGE,
  OFFLINE_IMAGE,
  "{{ site.baseurl }}/assets/css/style.css",
  "{{ site.baseurl }}/assets/js/app.js",
  "{{ site.logo | relative_url }}",
  "/",
  {% for post in site.posts limit: 10 %}
  "{{ post.url | relative_url }}",
  {% endfor %}
  {% for page in site.pages %}
    {% unless page.url contains 'sw.js' or page.url contains '404.html' or page.url contains 'offline.html' %}
      "{{ page.url | relative_url }}",
    {% endunless %}
  {% endfor %}
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Service Worker: Caching static assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => {
        return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName && name !== dynamicCacheName)
          .map((name) => {
            console.log("Service Worker: Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    }).then(() => {
        return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
      if (request.mode === 'navigate') {
        event.respondWith(
          caches.match(request).then(cachedResponse => {
              return cachedResponse || fetch(request).then(response => {
                  if (response.status < 400) {
                      return caches.open(dynamicCacheName).then(cache => {
                          cache.put(request.url, response.clone());
                          return response;
                      });
                  }
                  return response;
              });
          }).catch(() => {
              return caches.match(OFFLINE_PAGE);
          })
        );
      } else if (ASSETS_TO_CACHE.includes(url.pathname) ||
                 request.destination === 'image' ||
                 request.destination === 'style' ||
                 request.destination === 'script') {
          event.respondWith(
            caches.match(request).then(cachedResponse => {
                return cachedResponse || fetch(request).then(response => {
                    if (response.status < 400) {
                        return caches.open(cacheName).then(cache => {
                            cache.put(request.url, response.clone());
                            return response;
                        });
                    }
                    return response;
                }).catch(() => {
                    if (request.destination === 'image') {
                        return caches.match(OFFLINE_IMAGE);
                    }
                    return Response.error();
                });
            })
          );
      }
    }
    event.respondWith(fetch(request));
});