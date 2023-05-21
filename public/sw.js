const CACHE_NAME = "version-1";
const urlsToCache = [
  "/static/media/08.0802ae70.png",
  "/static/media/casual-life-3d-open-white-envelope-with-blue-letter.3386e408.png",
  "/static/media/casual-life-3d-diploma-certificate-obliquely-1.0843b09a.png",
  "/static/media/casual-life-3d-pink-location-marker.c4829a7b.png",
];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
