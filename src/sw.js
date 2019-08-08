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

 const PWA_API =  "http://localhost:9000" //"https://cautela.serveo.net"//"http://localhost:9000";
// const PWA_API =  "https://cautela.serveo.net"//

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

} else {

  console.log(`Boo! Workbox didn't load 😬`);
}




workbox.routing.registerRoute(
  `${PWA_API}/api/locations`,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp( `${PWA_API}/api/users.*`),
  new workbox.strategies.StaleWhileRevalidate()
);


workbox.routing.registerRoute(
  new RegExp( `${PWA_API}/api/locations/.*`),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  new RegExp( `${PWA_API}/api/cars/.*/damages`),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  `${PWA_API}/api/cars?populate=["carModelID", "locationID"]`,
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
  new workbox.strategies.CacheFirst({
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
        maxEntries: 50,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

const bgSyncPlugin = new workbox.backgroundSync.Plugin('PUT', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

const POSTbgSyncPlugin = new workbox.backgroundSync.Plugin('POST', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});


/*
workbox.routing.registerRoute(function(routeData) {
  return (routeData.event.request.headers.get('accept').includes('text/html'));
}, function(args) {
  return caches.match(args.event.request)
    .then(function (response) {
      if(response) {
        return response;
      } else {
        return fetch(args.event.request)
          .then(function(res) {
            return caches.open('dynamic')
              .then(cache.put(args.event.request.url, res.clone()));
              return res;
          })
          .catch(function (err) {
            return caches.match('/offline.html')
              .then(function (res) {
                return res;
              })
          })
      }
    })
})
*/
workbox.routing.registerRoute(
  /https:\/\/cautela.serveo.net\/api\/.*/,
    new workbox.strategies.NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
);


workbox.routing.registerRoute(
  /https:\/\/cautela.serveo.net\/api\/.*/,  
  new workbox.strategies.NetworkOnly({
    plugins: [POSTbgSyncPlugin]
  }),
  'POST'
);
