import Vue from "vue";
import * as firebase from "firebase"

Vue.use(firebase)

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDklk7f-REj76oqNKvfVZcjuFRXja-YTkM",
    authDomain: "chiprestore19.firebaseapp.com",
    databaseURL: "https://chiprestore19.firebaseio.com",
    projectId: "chiprestore19",
    storageBucket: "chiprestore19.appspot.com",
    messagingSenderId: "971375958873",
    appId: "1:971375958873:web:c886d49ba2642969398a48"
  })
};

export default firebase

