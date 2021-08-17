import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';


var firebaseConfig = {
    apiKey: "AIzaSyAktTAyg5bglGhjEBpNSWUUoQU8Fnj9U8k",
    authDomain: "prueba-vue-96f35.firebaseapp.com",
    projectId: "prueba-vue-96f35",
    storageBucket: "prueba-vue-96f35.appspot.com",
    messagingSenderId: "108607292601",
    appId: "1:108607292601:web:85549ab356f32267edc768",
    measurementId: "G-GRYM9RNKF0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  const db = firebase.firestore();

export default db;