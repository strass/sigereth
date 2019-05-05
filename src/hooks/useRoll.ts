import { useReducer, useCallback, Dispatch, ReducerAction } from 'react';
import D10 from '../services/D10';
import Roll from '../types/Roll';
import { Action } from '../types/Generic';

const rollReducer = (
  state: Roll['config'],
  action:
    | Action<'dice', { dice: Roll['config']['dice'] }>
    | Action<'double', { double: Roll['config']['double'] }>
    | Action<'reroll', { reroll: Roll['config']['reroll'] }>
    | Action<'autosuccesses', { autosuccesses: Roll['config']['autosuccesses'] }>
    | Action<'targetNumber', { targetNumber: Roll['config']['targetNumber'] }>
    | Action<'difficulty', { difficulty: Roll['config']['difficulty'] }>
) => {
  switch (action.type) {
    case 'dice':
      return { ...state, dice: action.dice };
    case 'double':
      return { ...state, double: action.double };
    case 'reroll':
      return { ...state, reroll: action.reroll };
    case 'autosuccesses':
      return { ...state, autosuccesses: action.autosuccesses };
    case 'targetNumber':
      return { ...state, targetNumber: action.targetNumber };
    case 'difficulty':
      return { ...state, difficulty: action.difficulty };
    default:
      return state;
  }
};

const useRoll = (
  initialConfig: Roll['config'] = {
    dice: 1,
    double: [10],
    reroll: [],
    autosuccesses: 0,
    targetNumber: 7,
    difficulty: 1,
  }
): [
  () => ReturnType<typeof D10.roll>,
  Roll['config'],
  Dispatch<ReducerAction<typeof rollReducer>>
] => {
  const [config, dispatch] = useReducer(rollReducer, initialConfig);
  const rollFn = useCallback(() => D10.roll(config), [config]);
  return [rollFn, config, dispatch];
};

export default useRoll;
