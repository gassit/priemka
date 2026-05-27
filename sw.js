var CACHE = 'priemka-v8';
var ASSETS = ['./manifest.json','./icon-192.png','./icon-128.png','./icon-512.png'];
self.addEventListener('install', function(e) { e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })); self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(caches.keys().then(function(k) { return Promise.all(k.filter(function(i){return i!==CACHE;}).map(function(i){return caches.delete(i);})); })); self.clients.claim(); });
self.addEventListener('fetch', function(e) { var u = e.request.url; if (u.endsWith('.html') || u.endsWith('/') || u.indexOf('/index.html') !== -1) { e.respondWith(fetch(e.request).catch(function() { return caches.match('./index.html'); })); return; } e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); })); });

self.addEventListener('install', function(event) {
    event.waitUntil(caches.open(CACHE).then(function(cache) {
        return cache.addAll(ASSETS);
    }));
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
            );
        })
    );
    self.clients.claim();
});

/* HTML — всегда из сети, остальные файлы — из кэша */
self.addEventListener('fetch', function(event) {
    var url = event.request.url;
    if (url.endsWith('.html') || url.endsWith('/') || url.indexOf('/index.html') !== -1) {
        event.respondWith(
            fetch(event.request).catch(function() {
                return caches.match('./index.html');
            })
        );
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
