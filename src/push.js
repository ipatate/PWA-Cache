import { initializeApp } from 'firebase';
import configFirebase from './configFirebase';

console.log(configFirebase); //eslint-disable-line
let firebase;
let messaging;

const getToken = () => {
  messaging
    .getToken()
    .then(currentToken => {
      if (currentToken) {
        console.log(currentToken); // eslint-disable-line
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.'); // eslint-disable-line
      }
    })
    .catch(err => {
      console.log('An error occurred while retrieving token. ', err); // eslint-disable-line
      //   showToken('Error retrieving Instance ID token. ', err); // eslint-disable-line
    });
};

const requestPermission = () => {
  messaging
    .requestPermission()
    .then(() => {
      console.log('Notification permission granted.'); // eslint-disable-line
      getToken();
    })
    .catch(err => {
      console.log('Unable to get permission to notify.', err); // eslint-disable-line
    });
};

const initMessaging = () => {
  firebase = initializeApp(configFirebase);
  messaging = firebase.messaging();
  requestPermission();
  messaging.onTokenRefresh(() => {
    messaging
      .getToken()
      .then(refreshedToken => {
        console.log('Token refreshed.'); // eslint-disable-line
        console.log(refreshedToken); // eslint-disable-line
      })
      .catch(err => {
        console.log('Unable to retrieve refreshed token ', err); // eslint-disable-line
      });
  });
  messaging.onMessage(payload => {
    console.log('Message received. ', payload); // eslint-disable-line
  });
  return messaging;
};

export default initMessaging;
