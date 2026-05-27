var CACHE = 'priemka-v8';
var ASSETS = ['./manifest.json','./icon-192.png','./icon-128.png','./icon-512.png'];
self.addEventListener('install', function(e) { e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })); self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(caches.keys().then(function(k) { return Promise.all(k.filter(function(i){return i!==CACHE;}).map(function(i){return caches.delete(i);})); })); self.clients.claim(); });
self.addEventListener('fetch', function(e) { var u = e.request.url; if (u.endsWith('.html') || u.endsWith('/') || u.indexOf('/index.html') !== -1) { e.respondWith(fetch(e.request).catch(function() { return caches.match('./index.html'); })); return; } e.respondWith(caches.match(e.request).then(function(r) { return r || fetch(e.request); })); });
