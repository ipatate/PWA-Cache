import { initializeApp } from 'firebase';

const config = {
  apiKey: 'AIzaSyDMUJPyfrMW0mvt5MIFGJB_rZb2MNtL78Y',
  authDomain: 'push-notification-c9f7c.firebaseapp.com',
  databaseURL: 'https://push-notification-c9f7c.firebaseio.com',
  projectId: 'push-notification-c9f7c',
  storageBucket: 'push-notification-c9f7c.appspot.com',
  messagingSenderId: '430285753319',
};

let firebase;
let messaging;

const initMessaging = () => {
  firebase = initializeApp(config);
  messaging = firebase.messaging();

  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.'); // eslint-disable-line
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    })
    .catch(err => {
      console.log('Unable to get permission to notify.', err); // eslint-disable-line
    });
  return messaging;
};

export default initMessaging;
