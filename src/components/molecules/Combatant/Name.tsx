/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import Section from './Section';
import { CombatantContext } from '../../context/CombatantContext';
import usePermissions from '../../../hooks/usePermissions';
import useCombatantAction from '../../../hooks/useCombatantAction';

const CombatantName: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);
  const dispatch = useCombatantAction();
  return (
    <Section
      title="Name"
      labelMarginBottom={0}
      css={{
        width: 'fit-content',
        position: 'relative',
        label: {
          position: 'absolute',
          width: 'fit-content',
        },
      }}
    >
      <input
        readOnly={!isResourceOwnerOrGameOwner}
        id={`combatant-${combatant.id}-${'Name'}`}
        value={combatant.data.name}
        onChange={e => dispatch({ type: 'SET_NAME', name: e.target.value })}
        css={[
          {
            width: '100%',
            border: 'none',
            borderBottom: '1px solid darkgrey',
            paddingTop: `${50 - 38}px`,
            fontSize: ' 2em',
            ':focus': {
              outline: 'none',
              borderBottomColor: 'grey',
            },
          },
          !isResourceOwnerOrGameOwner && {
            borderBottomColor: 'transparent !important',
            cursor: 'default',
          },
        ]}
      />
    </Section>
  );
};

export default CombatantName;
