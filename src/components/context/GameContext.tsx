/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { createContext, FunctionComponent, useMemo, memo, ReactElement } from 'react';
import useFirestore from '../../hooks/useFirestore';
import { store } from '../../services/Firestation';
import { DocumentSnapshotExpanded, QuerySnapshotExpanded } from '../../types/Firestore';
import Game from '../../types/Game';
import Combatant from '../../types/Combatant';

export const GameContext = createContext<{
  game: DocumentSnapshotExpanded<Game>;
  combatants: QuerySnapshotExpanded<Combatant>;
}>({
  game: (null as unknown) as DocumentSnapshotExpanded<Game>,
  combatants: (null as unknown) as QuerySnapshotExpanded<Combatant>,
});

const GameContextProvider: FunctionComponent<{ gameId: string; children: ReactElement }> = ({
  children,
  gameId,
}) => {
  const gameRef = useMemo(() => store.doc(`/games/${gameId}`), [gameId]);
  const combatantsRef = useMemo(() => gameRef && gameRef.collection('combatants'), [gameRef]);
  const [game] = useFirestore<Game>(gameRef);
  const [combatants] = useFirestore<Combatant>(combatantsRef);

  const value = useMemo(() => ({ game, combatants }), [game, combatants]);

  return (
    <GameContext.Provider value={value}>
      {value.game === null || value.combatants === null ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </GameContext.Provider>
  );
};

export default memo(GameContextProvider);
