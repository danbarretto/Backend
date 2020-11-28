import Firebase from 'firebase';
let config = {
  apiKey: 'AIzaSyBeuLJ4dzeodwkqVQTUWRfF0Dif26cGPvI',
  authDomain: 'flukebackend.firebaseapp.com',
  databaseURL: 'https://flukebackend.firebaseio.com',
  projectId: 'flukebackend',
  storageBucket: 'flukebackend.appspot.com',
  messagingSenderId: '1084787957283',
  appId: '1:1084787957283:web:3f04726b7703108b32db96',
  measurementId: 'G-B9215X9XL9',
};
export const app = Firebase.initializeApp(config);

