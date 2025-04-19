---
    permalink: /sw.js
layout: null
sitemap: false
---

const version = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
const cacheName = `static::${version}`;
const staticAssets = [
    {% for post in site.posts limit: 10 %}
'{{ post.url | relative_url }}',
    {% endfor %}
{% for page in site.pages %}
{% unless page.url contains 'sw.js' or page.url contains '404.html' or page.url contains '.xml' %}
'{{ page.url | relative_url }}',
    {% endunless %}
{% endfor %}
'{{ "/" | relative_url }}',
    '{{ "/assets/css/main.css" | relative_url }}',
    '{{ "/assets/js/main.js" | relative_url }}'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin !== location.origin) {
        return;
    }

    // Network first strategy with cache fallback
    e.respondWith(
        fetch(req)
            .then(async response => {
                // Cache successful responses
                if (response && response.status === 200) {
                    const cache = await caches.open(cacheName);
                    await cache.put(req, response.clone());
                }
                return response;
            })
            .catch(() => caches.match(req))
    );
});