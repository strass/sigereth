/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createContext, FunctionComponent, useMemo, memo, ReactElement } from 'react';
// import useFirestore from '../../hooks/useFirestore';
import { store } from '../../services/Firestation';
import Game from '../../types/Game';
import Combatant from '../../types/Combatant';
import useFirestoreDocument from '@strass/firestation/dist/useFirestoreDocument';
import useFirestoreQuery from '@strass/firestation/dist/useFirestoreQuery';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from '@strass/firestation/dist/types';

export const GameContext = createContext<DocumentSnapshotExpanded<Game>>(
  (null as unknown) as DocumentSnapshotExpanded<Game>
);

export const CombatantsContext = createContext<QuerySnapshotExpanded<Combatant>>(
  (null as unknown) as QuerySnapshotExpanded<Combatant>
);

const GameContextProvider: FunctionComponent<{ gameId: string; children: ReactElement }> = ({
  children,
  gameId,
}) => {
  const gameRef = useMemo(() => store.doc(`/games/${gameId}`), [gameId]);
  const combatantsRef = useMemo(() => gameRef && gameRef.collection('combatants'), [gameRef]);
  const game = useFirestoreDocument<Game>(gameRef);
  const combatants = useFirestoreQuery<Combatant>(combatantsRef);

  return (
    <GameContext.Provider value={game}>
      <CombatantsContext.Provider value={combatants}>
        {!game || !combatants ? <div>Loading...</div> : <React.Fragment>{children}</React.Fragment>}
      </CombatantsContext.Provider>
    </GameContext.Provider>
  );
};

export default memo(GameContextProvider);
