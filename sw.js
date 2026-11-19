// Naikkan nomor VERSI setiap file tampilan berubah, supaya HP mengambil yang baru.
const VERSI='tm-v16',FILE=['./','./index.html','./stylesheet.css','./javascript.js','./supabase.js','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./favicon-32.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSI).then(c=>c.addAll(FILE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==VERSI).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
// Hanya file tampilan milik sendiri. Jawaban Supabase / pustaka luar tidak pernah disimpan.
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(new Request(r.url,{cache:'no-cache'})).then(x=>{if(x.ok){const k=x.clone();caches.open(VERSI).then(c=>c.put(r,k))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
