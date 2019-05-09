/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useContext, useMemo, memo } from 'react';
import { orderBy, map, reject, head } from 'lodash';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { firestore } from 'firebase';
import AddCombatant from './AddCombatant';
import { GameContext, CombatantsContext } from '../../context/GameContext';
import CombatantWithContext from '../../context/CombatantContext';
import Combatant from '../../../types/Combatant';
import { DocumentSnapshotExpanded } from '../../../types/Firestore';

const CombatantsListBase: FunctionComponent<{
  combatantsRef: firestore.CollectionReference;
  activeCombatantName: string | false;
  activeCombatantId: string | false;
  orderedCombatantIds: string[];
}> = ({ combatantsRef, activeCombatantName, activeCombatantId, orderedCombatantIds }) => {
  console.debug('CombatantsListBase render');
  return (
    <React.Fragment>
      <h3>Active Combatant: {activeCombatantName || 'None'}</h3>
      <Flipper flipKey={orderedCombatantIds.join('')}>
        <ol>
          {orderedCombatantIds.map((id, i, arr) => (
            <Flipped key={id} flipId={id}>
              <li>
                <CombatantWithContext
                  combatantPath={combatantsRef.doc(id).path}
                  isActive={activeCombatantId === id}
                />
              </li>
            </Flipped>
          ))}
        </ol>
      </Flipper>
      <AddCombatant combatantsRef={combatantsRef} />
    </React.Fragment>
  );
};

const MemoizedCombatantsListBase = memo(CombatantsListBase);

const CombatantsList = () => {
  const game = useContext(GameContext);
  const combatants = useContext(CombatantsContext);
  const combatantsRef = useMemo(() => game.ref.collection('combatants'), [game]);

  // TODO: optimization
  const orderedCombatants = orderBy(map(combatants.docs, c => c), ['data.initiative'], ['desc']);
  const activeCombatants = reject(orderedCombatants, c => c.data.turnOver);
  const activeCombatant: DocumentSnapshotExpanded<Combatant> | undefined = head(activeCombatants);
  const orderedCombatantIds = useMemo(
    () => orderedCombatants.map(c => c.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderedCombatants.map(c => c.id).join('')]
  );
  return (
    <MemoizedCombatantsListBase
      combatantsRef={combatantsRef}
      activeCombatantName={!!activeCombatant && activeCombatant.data.name}
      activeCombatantId={!!activeCombatant && activeCombatant.id}
      orderedCombatantIds={orderedCombatantIds}
    />
  );
};

export default CombatantsList;
