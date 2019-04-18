import { useReducer, useEffect, Dispatch, ReducerAction } from 'react';
import { store, Firebase } from '../services/Firestation';
import { firestore } from 'firebase';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from '../types/Firestore';

const firestoreReducer = (
    state: DocumentSnapshotExpanded<any> | QuerySnapshotExpanded<any>,
    action:
        | { type: 'ON_DOC_SNAPSHOT'; snap: firestore.DocumentSnapshot }
        | { type: 'ON_COLLECTION_SNAPSHOT'; snap: firestore.QuerySnapshot }
) => {
    switch (action.type) {
        case 'ON_DOC_SNAPSHOT':
            return {
                exists: action.snap.exists,
                ref: action.snap.ref,
                id: action.snap.id,
                metadata: action.snap.metadata,
                data: action.snap.data(),
            } as DocumentSnapshotExpanded<any>;
        case 'ON_COLLECTION_SNAPSHOT':
            const docs = {};
            action.snap.docs.forEach(doc => {
                docs[doc.id] = {
                    exists: doc.exists,
                    ref: doc.ref,
                    id: doc.id,
                    metadata: doc.metadata,
                    data: doc.data(),
                } as DocumentSnapshotExpanded<any>;
            });
            return {
                docs,
                metadata: action.snap.metadata,
                size: action.snap.size,
                empty: action.snap.empty,
            } as QuerySnapshotExpanded<any>;
        default:
            return state;
    }
};

function useFirestore<T>(
    ref: firestore.DocumentReference
): [DocumentSnapshotExpanded<T>, Dispatch<ReducerAction<typeof firestoreReducer>>];
function useFirestore<T>(
    ref: firestore.CollectionReference
): [QuerySnapshotExpanded<T>, Dispatch<ReducerAction<typeof firestoreReducer>>];
function useFirestore(ref: firestore.DocumentReference | firestore.CollectionReference) {
    const out = useReducer(firestoreReducer, null);
    const [, dispatch] = out;
    useEffect(
        () => {
            console.debug(ref ? `subscribing to ${ref.path}` : 'bad ref');
            switch (true) {
                case !ref: {
                    console.warn('no ref');
                    break;
                }
                case ref instanceof firestore.DocumentReference: {
                    return (ref as firestore.DocumentReference).onSnapshot(snap => {
                        dispatch({ type: 'ON_DOC_SNAPSHOT', snap });
                    });
                    break;
                }
                case ref instanceof firestore.CollectionReference: {
                    return (ref as firestore.CollectionReference).onSnapshot({}, snap => {
                        dispatch({ type: 'ON_COLLECTION_SNAPSHOT', snap });
                    });
                    break;
                }
                default: {
                    console.warn('useFirestore failure', ref);
                }
            }
        },
        [ref && ref.path]
    );

    return out;
}

export default useFirestore;
