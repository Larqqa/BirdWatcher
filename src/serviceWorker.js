// Name of cache
const CACHE = 'v1';

// list of Local resources
const URLS = [
  './index.html',
  './bundle.js',
  './manifest.json',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => {

        // Add all local resources to cache
        return cache.addAll(URLS);
      })

      // Rewrite cache
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {

      // Get all caches that are not in current caches
      return cacheNames.filter(cacheName => ![ CACHE ].includes(cacheName));
    }).then(cachesToDelete => {

      // Delete found caches
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));

      // Take control of already registered pages
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses from cache
// If response is not found, it fetches it from the network
self.addEventListener('fetch', event => {

  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.waitUntil(
      event.respondWith(
        caches.match(event.request).then(cachedResponse => {

          // If request is found in cache, return cached response
          if (cachedResponse) {
            return cachedResponse;
          }

          // Else fetch from network
          return caches.open(CACHE).then(cache => {
            return fetch(event.request).then(response => {
              return cache.put(event.request, response.clone()).then(() => {
                return response;
              });
            });
          });
        })
      )
    );
  }
});