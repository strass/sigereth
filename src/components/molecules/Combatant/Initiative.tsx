/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import NumberSpinner from '../../atoms/NumberSpinner';
import { toNumber } from 'lodash';
import CombatantSection from './Section';
import usePermissions from '../../../hooks/usePermissions';
import { getUserRecord } from '../../../services/Firestation';

const CombatantInitiative: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);

  return (
    <CombatantSection title="Initiative">
      <NumberSpinner
        value={combatant.data.initiative}
        onChange={
          isResourceOwnerOrGameOwner
            ? e =>
                combatant.ref.update({ initiative: toNumber(e.target.value) })
            : undefined
        }
        id={`combatant-${combatant.id}-initiative`}
        css={{ fontSize: '1.6em', border: 'none', padding: 0, margin: 0 }}
        readOnly={!isResourceOwnerOrGameOwner}
      />
    </CombatantSection>
  );
};

export default CombatantInitiative;
