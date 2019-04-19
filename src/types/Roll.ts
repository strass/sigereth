export type D10Faces = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface Roll {
  config: {
    dice: number;
    double?: D10Faces[];
    reroll?: D10Faces[];
    autosuccesses?: number;
    targetNumber?: D10Faces;
    difficulty?: number;
  };
  result: {
    successes: number;
    isBotch: boolean;
    roll: D10Faces[];
  };
}

export default Roll;
