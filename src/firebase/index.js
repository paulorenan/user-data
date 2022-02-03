import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const config = {
  apiKey: "AIzaSyBdij7U0YlNl4Z5IxkdtuLSPuzRPAdjd38",
  authDomain: "user-data-3a401.firebaseapp.com",
  databaseURL: "https://user-data-3a401-default-rtdb.firebaseio.com",
  projectId: "user-data-3a401",
  storageBucket: "user-data-3a401.appspot.com",
  messagingSenderId: "593826698958",
  appId: "1:593826698958:web:2430517a453fa27130e29f",
  measurementId: "G-KC9X0DVVEH"
};
firebase.initializeApp(config);
const db = firebase.firestore();

// db.settings({ timeStampsInSnapshots: true });

export default db;