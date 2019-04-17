import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBEHtCfN8exbdLXvM0cudPNFAOTBSOsjME",
  authDomain: "sigereth.firebaseapp.com",
  databaseURL: "https://sigereth.firebaseio.com",
  projectId: "sigereth",
  storageBucket: "sigereth.appspot.com",
  messagingSenderId: "982858495175"
};

try {
  const app = firebase.initializeApp(config);
  firebase
    .auth()
    .signInAnonymously()
    .catch(function(error) {
      console.error("Auth error", error.code, error.message);
    });
} catch (ex) {}

export const store = firebase.firestore();
export type Firebase = typeof firebase;

console.error("remember to change firebase config");
