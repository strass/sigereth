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
        .then(async user => {
            if (user && user.user) {
                const userRecord = await store.doc(`/users/${user.user.uid}`).get();
                if (userRecord.exists === false) {
                    console.log({
                        userInfo: user.additionalUserInfo,
                        credential: user.credential,
                        operationType: user.operationType,
                        // user: user.user,
                    });
                    userRecord.ref.set({
                        userInfo: user.additionalUserInfo,
                        credential: user.credential,
                        operationType: user.operationType,
                        // user: user.user,
                    });
                }
            } else {
                console.warn('need something for sign out')
            }
        })
        .catch(function(error) {
            console.error('Auth error', error.code, error.message);
        });
} catch (ex) {
    console.error('Error authenticating')
}

export const store = firebase.firestore();
export type Firebase = typeof firebase;

console.error("remember to change firebase config");

export const getUID = () => {
    const currentUser = firebase.auth().currentUser
    return currentUser && currentUser.uid
};

export const getUserRecord: () => null | firebase.firestore.DocumentReference = () => {
    const uid = getUID();
    return uid ? store.doc(`/users/${getUID()}`) : null;
};