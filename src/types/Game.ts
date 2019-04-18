import { firestore } from 'firebase';

interface Game {
  // TODO: remove
  version: 0;
  name: string;
  turn: number;
  owner: firestore.DocumentReference;
  players: firestore.DocumentReference[];
}

export default Game;
