import { firestore } from 'firebase';

interface Game {
  name: string;
  turn: number;
  owner: firestore.DocumentReference;
  players: firestore.DocumentReference[];
}

export default Game;
