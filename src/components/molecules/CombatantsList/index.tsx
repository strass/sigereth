/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useMemo, useContext } from 'react';
import { orderBy, map, reject, head } from 'lodash';
import AddCombatant from './AddCombatant';
import { GameContext } from '../../context/GameContext';
import CombatantWithContext from '../../context/CombatantContext';

const CombatantsList: FunctionComponent = () => {
  const { game, combatants } = useContext(GameContext);

  // TODO: optimization
  const orderedCombatants = orderBy(
    map(combatants.docs, c => c),
    ['data.initiative'],
    ['desc']
  );
  const activeCombatants = reject(orderedCombatants, c => c.data.turnOver);
  const activeCombatant = head(activeCombatants);
  return (
    <React.Fragment>
      <h3>
        Active Combatant: {activeCombatant ? activeCombatant.data.name : 'None'}
      </h3>
      <ol>
        {orderedCombatants.map(c => (
          <CombatantWithContext
            combatantPath={c.ref.path}
            isActive={activeCombatant && activeCombatant.id === c.id}
            key={c.id}
          />
        ))}
      </ol>
      <AddCombatant combatantsRef={game.ref.collection('combatants')} />
    </React.Fragment>
  );
};

export default CombatantsList;
