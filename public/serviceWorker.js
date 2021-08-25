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

this.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
            return true;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
