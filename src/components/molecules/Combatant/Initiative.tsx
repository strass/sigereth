/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import NumberSpinner from '../../atoms/NumberSpinner';
import { toNumber } from 'lodash';
import CombatantSection from './Section';
import usePermissions from '../../../hooks/usePermissions';

const CombatantInitiative: FunctionComponent = () => {
    const combatant = useContext(CombatantContext);
    console.log('!', combatant)
    const { isResourceOwnerOrGameOwner } = usePermissions(combatant);

    return (
        <CombatantSection title="Initiative">
            <NumberSpinner
                value={combatant.data.initiative}
                onChange={e =>
                    isResourceOwnerOrGameOwner && combatant.ref.update({ initiative: toNumber(e.target.value) })
                }
                id={`combatant-${combatant.id}-initiative`}
                css={{ fontSize: '1.6em', border: 'none', padding: 0, margin: 0 }}
            />
        </CombatantSection>
    );
};

export default CombatantInitiative;
