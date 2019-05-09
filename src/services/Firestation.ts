import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/performance';

const config = {
  apiKey: 'AIzaSyBEHtCfN8exbdLXvM0cudPNFAOTBSOsjME',
  authDomain: 'sigereth.firebaseapp.com',
  databaseURL: 'https://sigereth.firebaseio.com',
  projectId: 'sigereth',
  storageBucket: 'sigereth.appspot.com',
  messagingSenderId: '982858495175',
  appId: '1:982858495175:web:3e9a62a4de287acb',
};

try {
  firebase.initializeApp(config);
  firebase
    .auth()
    .signInAnonymously()
    .then(async user => {
      if (user && user.user) {
        const userRecord = await store.doc(`/users/${user.user.uid}`).get();
        if (userRecord.exists === false) {
          userRecord.ref.set({
            userInfo: {
              isNewUser: user.additionalUserInfo && user.additionalUserInfo.isNewUser,
              providerId: user.additionalUserInfo && user.additionalUserInfo.providerId,
            },
            credential: user.credential,
            operationType: user.operationType,
            user: {
              displayName: user.user.displayName,
              email: user.user.email,
              emailVerified: user.user.emailVerified,
              phoneNumber: user.user.phoneNumber,
              photoURL: user.user.photoURL,
              providerData: user.user.providerData,
              uid: user.user.uid,
            },
          });
        }
        return true;
      }
      console.warn('need something for sign out');
      return false;
    })
    .catch(error => {
      console.error('Auth error', error.code, error.message);
    });
} catch (ex) {
  console.error('Error authenticating');
}

export const store = firebase.firestore();
export type Firebase = typeof firebase;

console.error('remember to change firebase config');

export const getUID = () => {
  const { currentUser } = firebase.auth();
  return currentUser && currentUser.uid;
};

export const getUserRecord: () => null | firebase.firestore.DocumentReference = () => {
  const uid = getUID();
  return uid ? store.doc(`/users/${getUID()}`) : null;
};

export const perf = firebase.performance();
