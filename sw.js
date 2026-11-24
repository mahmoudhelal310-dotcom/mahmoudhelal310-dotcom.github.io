/* سيرفس وركر: يخزّن كل ملفات التطبيق محلياً حتى تعمل الواجهة فوراً حتى بلا إنترنت،
   ويخزّن أيضاً نصوص القرآن ومواقيت الصلاة بعد أول مشاهدة لها لتبقى متاحة أوفلاين،
   أما الصوتيات والراديو والفيديو فلا تُخزَّن أبداً (كبيرة الحجم وتحتاج اتصالاً مباشراً) */
const CACHE = 'yaqeen-v2';
const API_CACHE = 'yaqeen-api-v1';
const CORE = [
  './', './index.html', './manifest.webmanifest',
  './favicon.png', './icons/icon-192.png', './icons/icon-512.png',
  './yaqeen-mahmoud-helal/yaqeen.css',
  './yaqeen-mahmoud-helal/yaqeen-host.js',
  './yaqeen-mahmoud-helal/yt.html',
  './yaqeen-mahmoud-helal/quran-meta.js',
  './yaqeen-mahmoud-helal/hadith-meta.js',
  './yaqeen-mahmoud-helal/data-lite.js',
  './yaqeen-mahmoud-helal/ibtihal-data.js',
  './yaqeen-mahmoud-helal/radio.js',
  './yaqeen-mahmoud-helal/tawasheeh.js',
  './yaqeen-mahmoud-helal/hadith.js',
  './yaqeen-mahmoud-helal/hajj.js',
  './yaqeen-mahmoud-helal/hifz.js',
  './yaqeen-mahmoud-helal/extras.js',
  './yaqeen-mahmoud-helal/adhan.js',
  './yaqeen-mahmoud-helal/audio-lib.js',
  './yaqeen-mahmoud-helal/calc.js',
  './yaqeen-mahmoud-helal/calc-faraid.js',
  './yaqeen-mahmoud-helal/calc-fin.js',
  './yaqeen-mahmoud-helal/calc-debts.js',
  './yaqeen-mahmoud-helal/calc-kaff.js',
  './yaqeen-mahmoud-helal/calc-ibadat.js',
  './yaqeen-mahmoud-helal/calc-contract.js',
];
// نطاقات النصوص الموثوقة التي يجوز تخزينها (قرآن، تفسير، حديث، مواقيت صلاة) — نص فقط، لا صوت ولا فيديو
const API_HOSTS = ['api.alquran.cloud', 'api.aladhan.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(CORE.map((u) => c.add(u).catch(() => {})))));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE && k !== API_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // الملفات والصفحات من نفس الموقع: كاش أولاً مع تحديث في الخلفية
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((cached) => {
        const fetchP = fetch(e.request).then((res) => {
          if (res && res.ok) caches.open(CACHE).then((c) => c.put(e.request, res.clone()));
          return res;
        }).catch(() => cached);
        return cached || fetchP;
      })
    );
    return;
  }

  // نصوص القرآن والحديث ومواقيت الصلاة من مصادر موثوقة: نخزّنها بعد أول طلب لتعمل لاحقاً أوفلاين
  if (API_HOSTS.includes(url.hostname)) {
    e.respondWith(
      caches.open(API_CACHE).then((c) =>
        c.match(e.request).then((cached) => {
          const fetchP = fetch(e.request).then((res) => {
            if (res && res.ok) c.put(e.request, res.clone());
            return res;
          }).catch(() => cached);
          return cached || fetchP;
        })
      )
    );
    return;
  }

  // كل ما عدا ذلك (راديو، يوتيوب، صوتيات) يمر مباشرة للشبكة بلا تخزين
});
