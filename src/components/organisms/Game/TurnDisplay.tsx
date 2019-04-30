/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useCallback, useContext } from 'react';
import { store } from '../../../services/Firestation';
import Combatant from '../../../types/Combatant';
import { forEach } from 'lodash';
import { GameContext } from '../../context/GameContext';

const TurnDisplay: FunctionComponent = () => {
  const { game, combatants } = useContext(GameContext);

  const advanceTurn = useCallback(() => {
    const batch = store.batch();
    batch.set(game.ref, { turn: game.data.turn + 1 }, { merge: true });
    forEach(combatants.docs, c => {
      batch.set(
        c.ref,
        {
          turnOver: false,
          ignoreOnslaught: c.data.ignoreOnslaught === 'SCENELONG' ? 'SCENELONG' : false,
        } as Combatant,
        { merge: true }
      );
      batch.set(c.ref, { motes: { hasRegainedMotesThisTurn: false } }, { merge: true });
    });
    batch.commit();
  }, [game.ref, game.data.turn, combatants]);

  return (
    <React.Fragment>
      <h2>turn {game.data.turn}</h2>
      <button onClick={advanceTurn}>Next Turn</button>
      <button onClick={() => game.ref.update({ turn: 0 })}>Reset Turns</button>
    </React.Fragment>
  );
};

export default TurnDisplay;
