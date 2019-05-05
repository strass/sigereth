import { useReducer, useEffect, Dispatch, ReducerAction } from 'react';
import { firestore } from 'firebase';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from '../types/Firestore';

const firestoreReducer = (
  state: DocumentSnapshotExpanded<any> | QuerySnapshotExpanded<any> | null,
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

interface UseFirestoreOptions {}

interface UseFirestoreOptionsDoc extends UseFirestoreOptions {
  query: never;
}
interface UseFirestoreOptionsCollection extends UseFirestoreOptions {
  query: (ref: firestore.CollectionReference) => firestore.Query;
}

function useFirestore<T>(
  ref: firestore.DocumentReference,
  options?: UseFirestoreOptionsDoc
): [DocumentSnapshotExpanded<T>, Dispatch<ReducerAction<typeof firestoreReducer>>];
function useFirestore<T>(
  ref: firestore.CollectionReference,
  options?: UseFirestoreOptionsCollection
): [QuerySnapshotExpanded<T>, Dispatch<ReducerAction<typeof firestoreReducer>>];
function useFirestore(
  ref: firestore.DocumentReference | firestore.CollectionReference,
  options?: UseFirestoreOptionsDoc | UseFirestoreOptionsCollection
) {
  const out = useReducer(firestoreReducer, null);
  const [, dispatch] = out;
  const refPath = ref && ref.path;
  const hasQuery = options && options.query;
  useEffect(() => {
    let cleanup = () => {};
    console.debug(ref ? `subscribing to ${ref.path}` : 'bad ref');
    switch (true) {
      case ref instanceof firestore.DocumentReference: {
        cleanup = (ref as firestore.DocumentReference).onSnapshot(snap => {
          dispatch({ type: 'ON_DOC_SNAPSHOT', snap });
        });
        break;
      }
      case ref instanceof firestore.CollectionReference: {
        const query =
          options && (options as UseFirestoreOptionsCollection).query
            ? (options as UseFirestoreOptionsCollection).query(ref as firestore.CollectionReference)
            : ref;
        cleanup = (query as firestore.CollectionReference | firestore.Query).onSnapshot(
          {},
          snap => {
            dispatch({ type: 'ON_COLLECTION_SNAPSHOT', snap });
          }
        );
        break;
      }
      default: {
        console.warn('useFirestore failure', ref);
      }
    }
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, hasQuery, refPath]);

  return out;
}

export default useFirestore;
