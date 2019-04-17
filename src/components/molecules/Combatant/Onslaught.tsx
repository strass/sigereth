/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import { toNumber } from 'lodash';
import NumberSpinner from '../../atoms/NumberSpinner';
import Section from './Section';

const Onslaught = () => {
  const combatant = useContext(CombatantContext);
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
        onChange={e =>
          combatant.ref.update({ onslaught: toNumber(e.target.value) })
        }
        id={`combatant-${combatant.id}-${sectionTitle}`}
        min={0}
      />
    </Section>
  );
};

export default Onslaught;
