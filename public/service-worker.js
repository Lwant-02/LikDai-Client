const CACHE_NAME = "likdai";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/index.css",
  "/assets/index.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/images/Logo.png",
  "/images/UK-Flag.jpg",
  "/images/step-2.png",
  "/images/step-3.png",
  "/sounds/key_sound.MP3",
  "/svg/accuracy.svg",
  "/svg/certificate.svg",
  "/svg/chrome.svg",
  "/svg/consistency.svg",
  "/svg/download.svg",
  "/svg/facebook.svg",
  "/svg/github.svg",
  "/svg/instagram.svg",
  "/svg/linkedin.svg",
  "/svg/pop-up.svg",
  "/svg/practice.svg",
  "/svg/Shan-Flag.svg",
  "/svg/speed.svg",
];

const preCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(urlsToCache);
};

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
  event.waitUntil(preCache());
});

const cleanCache = async () => {
  const keys = await caches.keys();
  const keysToDelete = keys
    .filter((key) => key !== CACHE_NAME)
    .map((key) => caches.delete(key));
  return Promise.all(keysToDelete);
};

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(cleanCache().then(() => self.clients.claim()));
});

const fetchAssets = async (event) => {
  try {
    const networkResponse = await fetch(event.request);
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      return new Response("Offline and no cached data found.", {
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers({ "Content-Type": "text/plain" }),
      });
    }
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(fetchAssets(event));
});
