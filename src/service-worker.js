/* eslint-disable */
import { initializeApp, messaging } from 'firebase';
import configFirebase from './configFirebase';

initializeApp({
  messagingSenderId: configFirebase.messagingSenderId,
});

const messager = messaging();

messager.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
