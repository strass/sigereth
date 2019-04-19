/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, FunctionComponent, useState, useEffect } from 'react';
import { getUserRecord, store } from '../../services/Firestation';
import useFirestore from '../../hooks/useFirestore';
import User from '../../types/User';
import { auth, firestore } from 'firebase';
import { DocumentSnapshotExpanded } from '../../types/Firestore';

const UserContext = createContext<DocumentSnapshotExpanded<User> | null>(null);

export const UserContextProvider: FunctionComponent = ({ children }) => {
  const [userRef, setUserRef] = useState(getUserRecord());
  const [user] = useFirestore<User>(userRef);
  useEffect(
    () =>
      auth().onAuthStateChanged(async newUser => {
        if (newUser) {
          const userRecord: firestore.DocumentSnapshot = await store
            .doc(`/users/${newUser.uid}`)
            .get();
          if (userRecord.exists) {
            setUserRef(userRecord.ref);
            return true;
          }
        } else {
          setUserRef(null);
          return false;
        }
        return;
      }),
    []
  );
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
