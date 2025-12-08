const CACHE_NAME = 'hathaway-cache-v1';
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

// 1. Instalación: Guardamos los archivos en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. Activación: Limpiamos cachés viejas si actualizas la app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// 3. Intercepción: Si no hay internet, servimos lo guardado
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});