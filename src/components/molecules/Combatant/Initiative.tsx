/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import NumberSpinner from '../../atoms/NumberSpinner';
import { toNumber } from 'lodash';
import CombatantSection from './Section';

const CombatantInitiative: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);

  return (
    <CombatantSection title="Initiative">
      <NumberSpinner
        value={combatant.data.initiative}
        onChange={e =>
          combatant.ref.update({ initiative: toNumber(e.target.value) })
        }
        id={`combatant-${combatant.id}-initiative`}
        css={{ fontSize: '1.6em', border: 'none', padding: 0, margin: 0 }}
      />
    </CombatantSection>
  );
};

export default CombatantInitiative;
