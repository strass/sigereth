import { firestore } from "firebase";

interface MoteCount {
  current: number;
  total: number;
}

interface WillpowerCount {
  temporary: number;
  permanent: number;
}

interface Combatant {
  initiative: number;
  name: string;
  turnOver: boolean;
  notes: string;
  onslaught: number;
  ignoreOnslaught: false | 'TURN_END' | 'SCENELONG';
  dodge: number;
  parry: number;
  owner: firestore.DocumentReference;

  motes: {
    personal: MoteCount;
    peripheral: MoteCount;
    hasRegainedMotesThisTurn: boolean;
  };

  health: {
    levels: Record<0 | 1 | 2 | 4 | 'I', number>;
    damage: {
      bashing: number;
      lethal: number;
      aggravated: number;
    };
  };

  willpower: WillpowerCount;
}

export default Combatant;
