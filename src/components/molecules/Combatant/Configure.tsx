/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import { toNumber } from 'lodash';
import NumberSpinner from '../../atoms/NumberSpinner';
import Section from './Section';

const CombatantConfigure = () => {
  const combatant = useContext(CombatantContext);
  const sectionTitle = 'Onslaught';
  return (
    <div>
      <ul>
        <li>mote display</li>
        <li>link to character/quick character</li>
        <li>save this combatant to stash</li>
        <li>notes display - to player, to gm</li>
      </ul>
    </div>
  );
};

export default CombatantConfigure;
