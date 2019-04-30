/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { toNumber } from 'lodash';
import { CombatantContext } from '../../context/CombatantContext';
import NumberSpinner from '../../atoms/NumberSpinner';
import Section from './Section';
import useCombatantAction from '../../../hooks/useCombatantAction';

const Onslaught = () => {
  const combatant = useContext(CombatantContext);
  const dispatch = useCombatantAction();

  const sectionTitle = 'Onslaught';
  return (
    <Section
      title={sectionTitle}
      onLabelClick={e => {
        e.preventDefault();
        e.stopPropagation();
        combatant.ref.update({ onslaught: 0 });
      }}
      labelTitle="Double click to reset"
    >
      <NumberSpinner
        value={combatant.data.onslaught}
        onChange={e => dispatch({ type: 'SET_ONSLAUGHT', onslaught: toNumber(e.target.value) })}
        id={`combatant-${combatant.id}-${sectionTitle}`}
        min={0}
        max={99}
      />
    </Section>
  );
};

export default Onslaught;
