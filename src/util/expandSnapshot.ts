import { firestore } from 'firebase';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from '../types/Firestore';

export const expandDocumentSnapshot = <T = any>(snap: firestore.DocumentSnapshot) =>
  ({
    exists: snap.exists,
    ref: snap.ref,
    id: snap.id,
    metadata: snap.metadata,
    data: snap.data(),
  } as DocumentSnapshotExpanded<T>);

export const expandQuerySnapshot = <T = any>(snap: firestore.QuerySnapshot) => {
  const docs = {};
  snap.docs.forEach(doc => {
    docs[doc.id] = {
      exists: doc.exists,
      ref: doc.ref,
      id: doc.id,
      metadata: doc.metadata,
      data: doc.data(),
    } as DocumentSnapshotExpanded<T>;
  });
  return {
    docs,
    metadata: snap.metadata,
    size: snap.size,
    empty: snap.empty,
  } as QuerySnapshotExpanded<T>;
};
