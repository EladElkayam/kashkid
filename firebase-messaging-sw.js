// ייבוא הספריות של פיירבייס שפועלות ברקע
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// האפליקציה שלך
firebase.initializeApp({
  apiKey: "AIzaSyD98iSDj8ggkfwsx9vIOVIcJ19c5X1g3cc",
  authDomain: "elkayam-kash.firebaseapp.com",
  projectId: "elkayam-kash",
  storageBucket: "elkayam-kash.firebasestorage.app",
  messagingSenderId: "306762891076",
  appId: "1:306762891076:web:08b3d7a0d0575aada96111"
});

const messaging = firebase.messaging();

// האזנה להודעות כשהאפליקציה סגורה או ברקע
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] קיבל הודעה ברקע: ', payload);
  
  const notificationTitle = payload.notification?.title || "משפחה במשימה 🌟";
  const notificationOptions = {
    body: payload.notification?.body || "יש לך משימה חדשה לבצע!",
    icon: 'https://emojicdn.elk.sh/🌟',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: '/' } // כשיפתחו את ההודעה, זה יפתח את האפליקציה
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});