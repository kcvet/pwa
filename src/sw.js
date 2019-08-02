/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA


importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}




workbox.routing.registerRoute(
  'http://localhost:9000/api/locations',
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  'http://localhost:9000/api/cars?populate=["carModelID"]',
  new workbox.strategies.StaleWhileRevalidate()
);


workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.css$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache CSS files.
  /\.html$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'html-cache',
  })
);

workbox.routing.registerRoute(
  // Cache JSON files.
  /\.json$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'json-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);


/*
const FILES_TO_CACHE = [
  'offline.html',
];
const CACHE_NAME = 'static-cache-v1';

console.log("service worker waking up")


self.addEventListener('activate', function(event) {
  console.log('Claiming control');
  event.waitUntil(self.clients.claim());
  });


self.addEventListener('install', (evt) => { 
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  console.log('Claiming control');
  event.waitUntil(self.clients.claim());
  });


  self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    // CODELAB: Add fetch event handler here.
    
    // CODELAB: Add fetch event handler here. 
      if (evt.request.mode !== 'navigate') {
      // Not a page navigation, bail.
      return;
      }
      evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            console.log("returning Cache")
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match('offline.html');
                });
          })
      );
  
  });

  
/*
'use strict';

const FILES_TO_CACHE = [
  '/offline.html',
];
const CACHE_NAME = 'static-cache-v1';

console.log("service worker waking up")


self.addEventListener('activate', function(event) {
  console.log('Claiming control');
  event.waitUntil(self.clients.claim());
  });


self.addEventListener('install', (evt) => { 
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activat6e kr nmeki');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  
  // CODELAB: Add fetch event handler here. 
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
    }
    evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
    );

});

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
*/