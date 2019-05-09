/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, FunctionComponent, useState, useEffect, Fragment } from 'react';
import { auth, firestore } from 'firebase';
import { getUserRecord, store } from '../../../services/Firestation';
import useFirestore from '../../../hooks/useFirestore';
import User from '../../../types/User';
import { DocumentSnapshotExpanded } from '../../../types/Firestore';

const UserContext = createContext<DocumentSnapshotExpanded<User> | null>(null);

export const UserContextProvider: FunctionComponent = ({ children }) => {
  const [userRef, setUserRef] = useState(getUserRecord());

  useEffect(() => {
    auth().onAuthStateChanged(async newUser => {
      if (newUser) {
        setUserRef(store.doc(`/users/${newUser.uid}`));
      } else {
        console.log(2);
        setUserRef(null);
      }
    });
  }, []);

  return userRef ? (
    <UserContextProviderWithoutAuthWait userRef={userRef}>
      {children}
    </UserContextProviderWithoutAuthWait>
  ) : (
    <Fragment>Signing in 1</Fragment>
  );
};

export const UserContextProviderWithoutAuthWait: FunctionComponent<{
  userRef: firestore.DocumentReference;
}> = ({ children, userRef }) => {
  const [user] = useFirestore<User>(userRef);
  return user ? (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  ) : (
    <Fragment>Signing in 2</Fragment>
  );
};

export default UserContext;
