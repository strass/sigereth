import { firestore } from "firebase";

export interface DocumentSnapshotExpanded<T> {
  exists: firestore.DocumentSnapshot["exists"];
  ref: firestore.DocumentSnapshot["ref"];
  id: firestore.DocumentSnapshot["id"];
  metadata: firestore.DocumentSnapshot["metadata"];
  data: T;
}

export interface QuerySnapshotExpanded<T> {
  docs: Record<string, DocumentSnapshotExpanded<T>>;
  metadata: firestore.QuerySnapshot["metadata"];
  size: firestore.QuerySnapshot["size"];
  empty: firestore.QuerySnapshot["empty"];
}
