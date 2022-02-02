import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/firestore';

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBdij7U0YlNl4Z5IxkdtuLSPuzRPAdjd38",
  authDomain: "user-data-3a401.firebaseapp.com",
  databaseURL: "https://user-data-3a401-default-rtdb.firebaseio.com",
  projectId: "user-data-3a401",
  storageBucket: "user-data-3a401.appspot.com",
  messagingSenderId: "593826698958",
  appId: "1:593826698958:web:2430517a453fa27130e29f",
  measurementId: "G-KC9X0DVVEH"
});

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', { 
    get () {
      return firebaseApp
    }
  })
}