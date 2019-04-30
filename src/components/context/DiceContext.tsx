/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  FunctionComponent,
  useReducer,
  Fragment,
  useEffect,
  useContext,
  useCallback,
  createContext,
  useMemo,
} from 'react';
import { firestore } from 'firebase';
import { QuerySnapshotExpanded } from '../../types/Firestore';
import Roll from '../../types/Roll';
import { GameContext } from './GameContext';
import { expandQuerySnapshot } from '../../util/expandSnapshot';
import D10 from '../../services/D10';

// declare module 'react-hook-thunk-reducer' {
//   export function Thunk<A, R, S>(dispatch: ThunkDispatch<A>, getState: () => S): R;

//   export function ThunkDispatch<A, never>(action: A): void;
//   export function ThunkDispatch<A, R, S>(thunk: Thunk<A, R, S>): R;

//   type UseThunkReducer = <S, A>(
//     reducer: Reducer<S, A>,
//     initialState: S,
//     init: (s: S) => S
//   ) => [S, ThunkDispatch<A, any, S>];

//   export default UseThunkReducer;
// }

const DiceContext = createContext({});

interface DiceContextState {
  rolls: QuerySnapshotExpanded<Roll>;
}
type DiceContextAction = { type: string } & ({
  type: 'ON_SNAPSHOT';
  snap: firestore.QuerySnapshot;
});

const diceContextReducer = (
  state: DiceContextState,
  action: DiceContextAction
) => {
  switch (action.type) {
    case 'ON_SNAPSHOT':
      return { ...state, rolls: expandQuerySnapshot(action.snap) };
    default:
      return state;
  }
};

export const DiceContextProvider: FunctionComponent = ({ children }) => {
  const { game } = useContext(GameContext);
  const rollsRef = useMemo(() => game && game.ref.collection('rolls'), [game]);
  const [state, dispatch] = useReducer(diceContextReducer, {
    rolls: (null as unknown) as DiceContextState['rolls'],
  });
  const dispatchSnapshot = useCallback(
    snap => dispatch({ type: 'ON_SNAPSHOT', snap }),
    [dispatch]
  );
  useEffect(() => {
    return rollsRef && rollsRef.onSnapshot(dispatchSnapshot);
  }, [game, dispatchSnapshot, rollsRef]);

  const rollDice = useCallback(
    (config: Roll['config']) =>
      rollsRef && rollsRef.add({ config, results: D10.roll(config) }),
    [rollsRef]
  );

  const value = useMemo(() => ({ state, rollDice }), [state, rollDice]);

  return (
    <DiceContext.Provider value={value}>
      {([state.rolls] as any[]).includes(null) ? (
        <Fragment>loading...</Fragment>
      ) : (
        children
      )}
    </DiceContext.Provider>
  );
};

export default DiceContext;
