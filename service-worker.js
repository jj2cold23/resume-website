const CACHE_NAME = "juwan-portfolio-v1";
const APP_FILES = ["./", "./index.html", "./style.css", "./app.js", "./manifest.json", "./icons/icon-192.svg", "./icons/icon-512.svg"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(name => name !== CACHE_NAME).map(name => caches.delete(name))))); self.clients.claim(); });
self.addEventListener("fetch", event => { if (event.request.method !== "GET") return; event.respondWith(caches.match(event.request).then(cachedResponse => cachedResponse || fetch(event.request))); });