// sw.js - Service Worker untuk SANDI DESA
// Strategi: app shell (HTML, manifest, ikon) di-cache saat install,
// lalu cache-first untuk aset sendiri, stale-while-revalidate untuk font Google.

const CACHE_VERSION = 'v1';
const CACHE_NAME = 'sandi-desa-cache-' + CACHE_VERSION;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

// ---- INSTALL: pre-cache app shell ----
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_SHELL);
    }).then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE: bersihkan cache versi lama ----
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key.startsWith('sandi-desa-cache-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// ---- FETCH ----
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Hanya tangani request GET
  if (req.method !== 'GET') return;

  // 1) Navigasi halaman (buka/refresh app) -> cache-first, fallback ke index.html saat offline
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', resClone));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 2) Font Google (fonts.googleapis.com / fonts.gstatic.com) -> stale-while-revalidate
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(req).then((cached) => {
          const fetchPromise = fetch(req)
            .then((netRes) => {
              cache.put(req, netRes.clone());
              return netRes;
            })
            .catch(() => cached);
          return cached || fetchPromise;
        })
      )
    );
    return;
  }

  // 3) Aset sendiri (same-origin: manifest, ikon, dsb) -> cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((netRes) => {
          const resClone = netRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return netRes;
        });
      })
    );
    return;
  }

  // 4) Request lain -> coba jaringan dulu, fallback ke cache jika ada
  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
