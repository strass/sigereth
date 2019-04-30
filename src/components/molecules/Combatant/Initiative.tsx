/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import { toNumber } from 'lodash';
import { CombatantContext } from '../../context/CombatantContext';
import NumberSpinner from '../../atoms/NumberSpinner';
import CombatantSection from './Section';
import usePermissions from '../../../hooks/usePermissions';
import useCombatantAction from '../../../hooks/useCombatantAction';

const CombatantInitiative: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);
  const dispatch = useCombatantAction();

  return (
    <CombatantSection title="Initiative">
      <NumberSpinner
        value={combatant.data.initiative}
        onChange={
          isResourceOwnerOrGameOwner
            ? e => dispatch({ type: 'SET_INITIATIVE', initiative: toNumber(e.target.value) })
            : undefined
        }
        id={`combatant-${combatant.id}-initiative`}
        css={{ fontSize: '1.6em', border: 'none', padding: 0, margin: 0 }}
        readOnly={!isResourceOwnerOrGameOwner}
        min={-99}
        max={999}
      />
    </CombatantSection>
  );
};

export default CombatantInitiative;
