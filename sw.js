// IMPORTANTE: Cambia este número (v5 -> v6, v7...) cada vez que hagas cambios en el código.
const CACHE_NAME = 'hathaway-cache-v6'; 

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './lista.html',
  './styles.css',
  './canciones.js',
  './funcionalidad.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// 1. INSTALACIÓN
self.addEventListener('install', (event) => {
  // skipWaiting hace que el SW nuevo se active de una, sin esperar.
  self.skipWaiting(); 
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. ACTIVACIÓN
self.addEventListener('activate', (event) => {
  // clients.claim hace que el SW controle la página inmediatamente.
  event.waitUntil(
    Promise.all([
      self.clients.claim(), 
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché vieja:', key);
            return caches.delete(key);
          }
        }));
      })
    ])
  );
});

// 3. INTERCEPCIÓN (ESTRATEGIA: NETWORK FIRST / RED PRIMERO)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // A. Intentamos ir a internet primero
    fetch(event.request)
      .then((networkResponse) => {
        // Si la respuesta es válida, la guardamos en caché (actualizamos) y la devolvemos
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return networkResponse;
      })
      .catch(() => {
        // B. Si NO hay internet (catch), devolvemos lo que haya en caché
        return caches.match(event.request);
      })
  );
});