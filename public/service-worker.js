const CACHE_NAME = "likdai-v1";
const STATIC_CACHE = "likdai-static-v1";
const DYNAMIC_CACHE = "likdai-dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/fonts/GHKKengtung.ttf",
  "/fonts/GHKTachileik.ttf",
  "/fonts/GreatHorKham.ttf",
  "/icons/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/images/UK-Flag.jpg",
  "/images/normal-typing.jpg",
  "/images/running.jpg",
  "/images/screenshot-four.png",
  "/images/screenshot-one.png",
  "/images/screenshot-three.png",
  "/images/screenshot-two.png",
  "/images/shooter.jpg",
  "/images/word-falling.jpg",
  "/songs/kaw-lawe-inn-fung.mp3",
  "/songs/khut-ja-lai-inn-fung.mp3",
  "/songs/pham-tar-kein-kham.mp3",
  "/songs/yount-hak-inn-fung.mp3",
  "/songs/yum-la-lain-phoo.mp3",
  "/sounds/key_sound.MP3",
  "/svg/Shan-Flag.svg",
  "/svg/accuracy.svg",
  "/svg/certificate.svg",
  "/svg/chrome.svg",
  "/svg/consistency.svg",
  "/svg/facebook.svg",
  "/svg/github.svg",
  "/svg/google-svg.svg",
  "/svg/instagram.svg",
  "/svg/linkedin.svg",
  "/svg/pop-up.svg",
  "/svg/practice.svg",
  "/svg/speed.svg",
];

// Pre-cache static assets
const preCache = async () => {
  const cache = await caches.open(STATIC_CACHE);
  await cache.addAll(STATIC_ASSETS);
  console.log("Service Worker: Static assets cached");
};

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");
  self.skipWaiting();
  event.waitUntil(preCache());
});

// Clean up old caches
const cleanCache = async () => {
  const keys = await caches.keys();
  const keysToDelete = keys
    .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
    .map((key) => caches.delete(key));
  await Promise.all(keysToDelete);
  console.log("Service Worker: Old caches cleaned");
};

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating");
  event.waitUntil(cleanCache().then(() => self.clients.claim()));
});

// Handle fetch events with network-first for API calls, cache-first for static assets
const handleFetch = async (event) => {
  const requestUrl = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return fetch(event.request);
  }

  // Skip chrome-extension and other non-http requests
  if (!requestUrl.protocol.startsWith("http")) {
    return fetch(event.request);
  }

  // For navigation requests (SPA routing), serve index.html from cache
  if (event.request.mode === "navigate") {
    const cachedResponse = await caches.match("/index.html");
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(event.request);
  }

  // For static assets, use cache-first strategy
  const extPath = requestUrl.pathname.toLowerCase();
  if (
    extPath.endsWith(".js") ||
    extPath.endsWith(".css") ||
    extPath.endsWith(".png") ||
    extPath.endsWith(".jpg") ||
    extPath.endsWith(".jpeg") ||
    extPath.endsWith(".svg") ||
    extPath.endsWith(".mp3") ||
    extPath.endsWith(".ttf") ||
    extPath.endsWith(".woff2") ||
    extPath.endsWith(".woff")
  ) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    try {
      const networkResponse = await fetch(event.request);
      if (networkResponse.ok) {
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      return new Response("Offline", { status: 503 });
    }
  }

  // For API calls, use network-first strategy
  if (requestUrl.pathname.startsWith("/api")) {
    try {
      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }
      return new Response(
        JSON.stringify({ error: "offline", message: "You are offline" }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // For all other requests, try network first, fall back to cache
  try {
    const networkResponse = await fetch(event.request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(event.request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // For HTML navigation, return index.html for SPA
    if (event.request.headers.get("accept")?.includes("text/html")) {
      const indexHtml = await caches.match("/index.html");
      if (indexHtml) {
        return indexHtml;
      }
    }
    return new Response("Offline and no cached data found.", {
      status: 503,
      statusText: "Service Unavailable",
      headers: new Headers({ "Content-Type": "text/plain" }),
    });
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(handleFetch(event));
});
