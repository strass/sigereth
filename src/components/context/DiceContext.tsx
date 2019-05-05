/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  FunctionComponent,
  useReducer,
  useEffect,
  useContext,
  useCallback,
  createContext,
  useMemo,
  Fragment,
} from 'react';
import { firestore } from 'firebase';
import { QuerySnapshotExpanded, DocumentSnapshotExpanded } from '../../types/Firestore';
import Roll from '../../types/Roll';
import { GameContext } from './GameContext';
import { expandQuerySnapshot, expandDocumentSnapshot } from '../../util/expandSnapshot';
import D10 from '../../services/D10';
import { getUserRecord } from '../../services/Firestation';

const DiceContext = createContext<
  DiceContextState & {
    rollDice: (config: Roll['config']) => Promise<DocumentSnapshotExpanded<Roll>>;
  }
>({
  rolls: null,
  // @ts-ignore
  rollDice: () => {},
});

interface DiceContextState {
  rolls: QuerySnapshotExpanded<Roll> | null;
}
type DiceContextAction = { type: string } & ({
  type: 'ON_SNAPSHOT';
  snap: firestore.QuerySnapshot;
});

const diceContextReducer = (state: DiceContextState, action: DiceContextAction) => {
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

  useEffect(() => {
    return rollsRef && rollsRef.onSnapshot(snap => dispatch({ type: 'ON_SNAPSHOT', snap }));
  }, [game, rollsRef]);

  const rollDice = useCallback(
    async (config: Roll['config']) => {
      const theRoll: Roll = {
        config,
        result: D10.roll(config),
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
        owner: getUserRecord() as firestore.DocumentReference,
      };
      const t = rollsRef
        ? expandDocumentSnapshot<Roll>(await (await rollsRef.add(theRoll)).get())
        : Promise.reject(new Error('DiceContextProvider has bad rollsRef'));
      return t;
    },
    [rollsRef]
  );

  const value = useMemo(() => ({ rolls: state.rolls, rollDice }), [state, rollDice]);

  return (
    <DiceContext.Provider value={value}>
      {state.rolls === null ? <Fragment>loading...</Fragment> : children}
    </DiceContext.Provider>
  );
};

export default DiceContext;
