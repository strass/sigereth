/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useCallback, useContext, memo } from 'react';
import { forEach } from 'lodash';
import { store } from '../../../services/Firestation';
import Combatant from '../../../types/Combatant';
import { GameContext, CombatantsContext } from '../../context/GameContext';

const TurnDisplayBase: FunctionComponent<{
  turn: number;
  advanceTurn: () => void;
  resetTurns: () => void;
}> = ({ turn, advanceTurn, resetTurns }) => (
  <React.Fragment>
    <h2>turn {turn}</h2>
    <button type="button" onClick={advanceTurn}>
      Next Turn
    </button>
    <button type="button" onClick={resetTurns}>
      Reset Turns
    </button>
  </React.Fragment>
);

const MemoizedTurnDisplayBase = memo(TurnDisplayBase);

const TurnDisplay: FunctionComponent = () => {
  const game = useContext(GameContext);
  const combatants = useContext(CombatantsContext);

  const advanceTurn = useCallback(() => {
    const batch = store.batch();
    batch.set(game.ref, { turn: game.data.turn + 1 }, { merge: true });
    forEach(combatants.docs, c => {
      const fieldsToChange: Partial<Combatant> = {
        turnOver: false,
        ignoreOnslaught: c.data.ignoreOnslaught === 'SCENELONG' ? 'SCENELONG' : false,
      };
      batch.set(c.ref, fieldsToChange, { merge: true });
      batch.set(c.ref, { motes: { hasRegainedMotesThisTurn: false } }, { merge: true });
    });
    batch.commit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.ref.path, game.data.turn, Object.keys(combatants.docs).join('')]);

  const resetTurns = useCallback(() => game.ref.update({ turn: 0 }), [game.ref]);

  return (
    <MemoizedTurnDisplayBase
      resetTurns={resetTurns}
      turn={game.data.turn}
      advanceTurn={advanceTurn}
    />
  );
};

export default memo(TurnDisplay);
