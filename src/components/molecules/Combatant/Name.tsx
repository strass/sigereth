/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import Section from './Section';
import { CombatantContext } from '../../context/CombatantContext';
import usePermissions from '../../../hooks/usePermissions';

const CombatantName: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);
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
        onChange={e => combatant.ref.update({ name: e.target.value })}
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
