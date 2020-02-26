"use strict";

// Update cache names any time any of the cached files change.
const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1";

// Add list of files to cache here.
const FILES_TO_CACHE = [
  "/",
  "./index.html",
  "./scripts/app.js",
  "./bootstrap/css/bootstrap.min.css",
  "./bootstrap/js/bootstrap.min.js",
  "./css/custom_styles.css",
  "./css/Regisration-Form-With-Photo.css",
  "./css/styles.min.css",
  "./scripts/jquery.touchSwipe.js",
  "./fonts/font-awesome.min.css",
  "./fonts/fontawesome-webfont.eot",
  "./fonts/fontawesome-webfont.svg",
  "./fonts/fontawesome-webfont.ttf",
  "./fonts/fontawesome-webfont.woff",
  "./fonts/fontawesome-webfont.woff2",
  "./fonts/FontAwesome.otf",
  "./images/add.svg",
  "../favicon.ico",
  "./images/install.svg",
  "./images/sidebar_bg.png",
  "./images/register_pg_img.png",
  "./images/menu_bg.png",
  "./offline.html",
  "https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css",
  "http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css",
  "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jquery.nicescroll/3.7.6/jquery.nicescroll.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.js",
  "./images/icons/72x72.png",
  "./images/icons/96x96.png",
  "./images/icons/144x144.png",
  "./images/icons/152x152.png",
  "./images/icons/192x192.png",
  "./images/icons/256x256.png",
  "./images/icons/512x512.png"
];

self.addEventListener("install", evt => {
  //console.log("[ServiceWorker] Install");
  //Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      //console.log("[ServiceWorker] Pre-caching offline page");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", evt => {
  //console.log("[ServiceWorker] Activate");
  //Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            //console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", evt => {
  //console.log("[ServiceWorker] Fetch", evt.request.url);
  //Fetch event handler here.
  //Check what must be included in the url to display such a page
  if (evt.request.url.indexOf("firestore.googleapis.com") === -1) {
    //console.log("[Service Worker] Fetch (data)", evt.request.url);
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request).then(response => {
          // If the response was good, clone it and store it in the cache.
          if (response.status === 200) {
            cache.put(evt.request.url, response.clone());
          }
          return response;
        }).catch(err => {
          // Network request failed, try to get it from the cache.
          return cache.match(evt.request);
        });
      }).catch(() => {
        if (event.request.url.indexOf(".html") < 0) {
          return caches.match("./offline.html");
        }
      })
    );
    return;
  }
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});
