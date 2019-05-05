/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import randomColor from 'randomcolor';
import { CombatantContext } from '../../context/CombatantContext';
import CheckboxAtom from '../../atoms/Checkbox';
import useCombatantAction from '../../../hooks/useCombatantAction';
import useFirestore from '../../../hooks/useFirestore';
import User from '../../../types/User';

const CombatantAvatar: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const [combatantOwner] = useFirestore<User>(combatant && combatant.data.owner);
  const dispatch = useCombatantAction();
  return (
    <label
      css={{
        height: 50,
        width: 50,
        borderRadius: '50%',
        background: 'lightgrey',
        border: `2px solid ${combatantOwner ? randomColor({ seed: combatantOwner.id }) : 'grey'}`,
      }}
      htmlFor={`combatant-${combatant.id}-turnover-toggle`}
    >
      <CheckboxAtom
        id={`combatant-${combatant.id}-turnover-toggle`}
        checked={combatant.data.turnOver}
        onChange={_e => dispatch({ type: 'TOGGLE_TURN_OVER' })}
      />
    </label>
  );
};

export default CombatantAvatar;
