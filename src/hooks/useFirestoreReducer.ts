import { useCallback, useState, useEffect, useRef } from 'react';
import { firestore } from 'firebase';
import useList from 'react-use/esm/useList';
import { DocumentSnapshotExpanded } from '../types/Firestore';
import { expandDocumentSnapshot } from '../util/expandSnapshot';

type UseFirestoreReducerAction = { type: string } & ({
  type: 'SUBSCRIBE';
  ref: firestore.DocumentReference;
});

const useFirestoreReducer = <T>() => {
  const [store, setStore] = useState<Record<string, DocumentSnapshotExpanded<T> | null>>({});
  const storeRef = useRef(store);
  const [subscriptions, { push: addSubscription }] = useList<() => void>();
  const subscriptionsRef = useRef(subscriptions);

  // Keep a ref that's up to date with the store
  useEffect(() => {
    storeRef.current = store;
  }, [store]);
  const dispatch = useCallback(
    (action: UseFirestoreReducerAction) => {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case 'SUBSCRIBE': {
          const unsubscribe = action.ref.onSnapshot(snap => {
            setStore({ ...storeRef.current, [snap.id]: expandDocumentSnapshot(snap) });
          });
          addSubscription(unsubscribe);
          break;
        }
      }
    },
    [addSubscription]
  );

  // Keep a ref that's up to date with subscriptions,
  // use it to unsubscribe from all our firestore subscriptions
  // once we're ready to unmount the component
  useEffect(() => {
    subscriptionsRef.current = subscriptions;
  }, [subscriptions]);
  useEffect(() => {
    return () => subscriptionsRef.current.forEach(unsubscribe => unsubscribe());
  }, []);

  const out: [typeof store, typeof dispatch] = [store, dispatch];
  return out;
};

export default useFirestoreReducer;
