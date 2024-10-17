self.addEventListener('install', (event) => {
    console.log('Service Worker instalado.');
    event.waitUntil(
        caches.open('fuel-app-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/assets/icons/icon-192x192.png',
                '/assets/icons/icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
