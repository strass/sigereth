/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, FunctionComponent, useState, useEffect } from 'react';
import { getUserRecord, store } from '../../services/Firestation';
import useFirestore from '../../hooks/useFirestore';
import User from '../../types/User';
import { auth } from 'firebase';
import { DocumentSnapshotExpanded } from '../../types/Firestore';

const UserContext = createContext<DocumentSnapshotExpanded<User> | null>(null);

export const UserContextProvider: FunctionComponent = ({ children }) => {
    const [userRef, setUserRef] = useState(getUserRecord());
    const [user] = useFirestore<User>(userRef);
    console.log(userRef && userRef.id, '?', user && user.exists, user && user.data);
    useEffect(
        () =>
            auth().onAuthStateChanged(newUser =>
                newUser && newUser.isAnonymous === false && setUserRef(store.doc(`/users/${newUser.uid}`))
            ),
        []
    );
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserContext;
