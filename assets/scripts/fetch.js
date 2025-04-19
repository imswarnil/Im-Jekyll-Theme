self.addEventListener("fetch", event => {
    const { request } = event;
    const url = new URL(request.url);
  
    // 1. Handle navigation requests (pages) with Network-First, falling back to cache, then offline page
    if (request.mode === 'navigate') {
      event.respondWith(
        fetch(request).then(response => {
          // Cache the successful response for future offline use
          if (response.ok) {
            return caches.open(dynamicCacheName).then(cache => {
              cache.put(request.url, response.clone());
              return response;
            });
          }
          // If network fails for navigation, try the cache
          return caches.match(request) || caches.match(OFFLINE_PAGE);
        }).catch(() => {
          // If both network and cache fail for navigation, return the offline page
          return caches.match(OFFLINE_PAGE);
        })
      );
      return;
    }
  
    // 2. Handle static assets (CSS, JS, images) with Cache-First, falling back to network
    if (buildContentBlob().includes(url.pathname) || request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
      event.respondWith(
        caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then(response => {
            // Cache the successful response for future offline use
            if (response.ok) {
              return caches.open(cacheName).then(cache => { // Use static cache for these
                cache.put(request.url, response.clone());
                return response;
              });
            }
            return response;
          }).catch(() => {
            // If cache and network fail for images, return the offline image
            if (request.destination === 'image') {
              return caches.match(OFFLINE_IMAGE);
            }
            // For other static assets, a generic error might be acceptable,
            // or you could have a default offline asset for them too.
            return Response.error();
          });
        })
      );
      return;
    }
  
    // 3. For other requests (e.g., API calls), go to the network only
    event.respondWith(fetch(request));
  });