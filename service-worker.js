const version = "1.0";
const cacheName = `germano-quotes-v${version}`;

const main = [
  "/index.html",
  "/",
  "/css/style.css",
  "/css/reset.css",
  "/img/favicon/favicon.ico",
  "/img/favicon/favicon-32x32.png",
];

const static = [
  "/json/quotes.json",
  "/js/script.js",
  "/img/motivation/braden-collum-ttbCwN_mWic-unsplash.jpg",
  "/img/motivation/brett-patzke-pYeO_rIZ1EM-unsplash.jpg",
  "/img/motivation/joshua-earle-Lfxav1eVM4Y-unsplash.jpg",
  "/img/motivation/joshua-j-cotten-8Wzg5-hsPNQ-unsplash.jpg",
  "/img/motivation/joshua-j-cotten-M3NF-IS6L0E-unsplash.jpg",
  "/img/motivation/joshua-j-cotten-Vbhx5nVemkk-unsplash.jpg",
  "/img/motivation/joshua-sortino-XMcoTHgNcQA-unsplash.jpg",
  "/img/motivation/josiah-weiss-3dCljt2Pud8-unsplash.jpg",
  "/img/motivation/stephanie-slavick-503aTS6c2Vw-unsplash.jpg",
];

self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll([...static, ...main]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheKeeplist = [cacheName];
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (cacheKeeplist.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.log("Service worker error: ", error);
      })
  );
});
