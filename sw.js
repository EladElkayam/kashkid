// קובץ Service Worker - פועל ברקע
const CACHE_NAME = 'mishpacha-cache-v1';

// מתקין את ה-Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
});

// מפעיל אותו
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(clients.claim());
});

// מאזין להתראות דחיפה (Push) מהשרת בעתיד
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'משפחה במשימה 🌟';
  const options = {
    body: data.body || 'יש לך התראה חדשה!',
    icon: 'https://emojicdn.elk.sh/🌟',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: '/' }
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

// מה קורה שלוחצים על ההתראה? פותח את האפליקציה!
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      // אם האפליקציה כבר פתוחה ברקע, תעבור אליה
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // אם היא סגורה, תפתח אותה
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});