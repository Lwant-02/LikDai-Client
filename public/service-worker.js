const CACHE_NAME = "likdai-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/index.css",
  "/assets/main.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "images/Logo.png",
  "images/UK-Flag.jpg",
  "sounds/key_sound.MP3",
  "svg/accuracy.svg",
  "svg/certificate.svg",
  "svg/consistency.svg",
  "svg/facebook.svg",
  "svg/github.svg",
  "svg/instagram.svg",
  "svg/linkedin.svg",
  "svg/practice.svg",
  "svg/Shan-Flag.svg",
  "svg/speed.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches
        .match("/index.html")
        .then((response) => response || fetch(event.request))
    );
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
