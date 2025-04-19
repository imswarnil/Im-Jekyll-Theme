---
    permalink: /sw.js
layout: null
sitemap: false
---

const version = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const cacheName = `static::${version}`;
const staticAssets = [
    '/',
    {% for post in site.posts limit: 10 %}
'{{ post.url | relative_url }}',
    {% endfor %}
{% for page in site.pages %}
{% unless page.url contains 'sw.js' or page.url contains '404' or page.url contains '.xml' %}
'{{ page.url | relative_url }}',
    {% endunless %}
{% endfor %}
'{{ "/assets/css/main.css" | relative_url }}',
    '{{ "/assets/js/main.js" | relative_url }}',
    '{{ "/assets/scripts/fetch.js" | relative_url }}',
    '{{ "/assets/default-offline-image.png" | relative_url }}'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets.filter(url => !url.match(/undefined/)));
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== cacheName) {
                        return caches.delete(key);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    const req = e.request;
    const url = new URL(req.url);

    // Skip non-GET and cross-origin requests
    if (req.method !== 'GET' || url.origin !== location.origin) {
        return;
    }

    // Network first strategy
    e.respondWith(
        fetch(req)
            .then(async res => {
                // Cache successful responses
                if (res && res.status === 200) {
                    const cache = await caches.open(cacheName);
                    await cache.put(req, res.clone());
                }
                return res;
            })
            .catch(() => {
                // Fallback to cache
                return caches.match(req)
                    .then(cachedRes => cachedRes ||
                        caches.match('/offline/') ||
                        caches.match('{{ "/assets/default-offline-image.png" | relative_url }}')
                    );
            })
    );
});