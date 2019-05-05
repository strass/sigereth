import { firestore } from 'firebase';
import { WithDates } from './Generic';

export type D10Faces = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Roll {
  config: {
    dice: number;
    double?: number[];
    reroll?: number[];
    autosuccesses?: number;
    targetNumber?: number;
    difficulty?: number;
  };
  result: {
    successes: number;
    isBotch: boolean;
    roll: number[];
  };
}

type RollWithDates = WithDates<Roll> & { owner: firestore.DocumentReference };

export default RollWithDates;
