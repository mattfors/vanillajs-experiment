(()=>{const e=["/","/index.html","/styles.css","/bundle.js","/icon-192x192.png","/icon-512x512.png"];self.addEventListener("install",(n=>{n.waitUntil(caches.open("vanillajs-experiment-cache-v1").then((n=>n.addAll(e))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((n=>n||fetch(e.request))))}))})();