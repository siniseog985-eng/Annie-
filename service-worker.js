const CACHE_NAME="annie-pwa-v7";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",e=>{const r=e.request;if(r.method!=="GET"||new URL(r.url).origin!==self.location.origin)return;e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const c=res.clone();caches.open(CACHE_NAME).then(cache=>cache.put(r,c))}return res}).catch(()=>caches.match(r).then(c=>c||caches.match("./index.html"))))});
