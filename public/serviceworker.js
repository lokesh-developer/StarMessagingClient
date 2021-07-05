const CACHE_NAME = "StarMessaging";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("cache opened");
        cache.addAll([
          "/index.html",
          "/",
          "/static/js/bundle.js",
          "/static/js/main.chunk.js",
          "/static/js/vendors~main.chunk.js",
          "/logo192.png",
          "/manifest.json",
          "/favicon.ico",
        ]);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(() => {
        return fetch(event.request).catch((err) => caches.match("/"));
      })
    );
  }
});

this.addEventListener("activate", (event) => {
  const cacheWhiteList = [];

  cacheWhiteList.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      });
    })
  );
});
