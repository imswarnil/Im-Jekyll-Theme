---
permalink: /assets/scripts/sw.js
layout: null
sitemap: false
---

const version = '{{ site.time | date: '%Y%m%d%H%M%S' }}'; // Keep versioning
const cacheName = `static-test::${version}`; // Use a different name for testing

// Install event - does nothing yet
self.addEventListener('install', event => {
  console.log(`[SW ${version}] Install Event - Basic Test`);
  // Skip waiting to activate faster
  event.waitUntil(self.skipWaiting());
});

// Activate event - does minimal cleanup
self.addEventListener('activate', event => {
  console.log(`[SW ${version}] Activate Event - Basic Test`);
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.startsWith('static-test::') && key !== cacheName) // Clean up test caches
          .map(key => caches.delete(key))
      );
    }).then(() => self.clients.claim()) // Claim clients
  );
});

// Fetch event - does nothing yet
self.addEventListener('fetch', event => {
  // console.log(`[SW ${version}] Fetch intercepted: ${event.request.url}`);
  // Let the network handle it for now
  return;
});

console.log(`[SW ${version}] Basic Test Script Loaded`); // Log to confirm loading