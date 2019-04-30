/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import CheckboxAtom from '../../atoms/Checkbox';
import useCombatantAction from '../../../hooks/useCombatantAction';

const CombatantAvatar: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const dispatch = useCombatantAction();
  return (
    <CheckboxAtom
      checked={combatant.data.turnOver}
      onChange={_e => dispatch({ type: 'TOGGLE_TURN_OVER' })}
    />
  );
};

export default CombatantAvatar;
