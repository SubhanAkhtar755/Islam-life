const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/Allahnames.html",
  "/hadees.html",
  "/Muhammadnames.html",
  "/style.css",
  "/Allahnames.css",
  "/hadees.css",
  "/Muhammadnames.css",
  "/script.js",
  "/hadees.js",
  "/Muhammadnames.js",
  "/Allahnames.js",
  
  "/android/android-launchericon-144x144.png",
  "/android/android-launchericon-192x192.png",
  "/android/android-launchericon-512x512.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})