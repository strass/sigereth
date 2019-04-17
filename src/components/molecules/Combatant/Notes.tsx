/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import { noMarginPadding } from '../../../styling/normalize';
import { allSmallCaps } from '../../../styling/type';
import H from '../../atoms/Type/Header';

const CombatantNotes: FunctionComponent = () => {
  const combatant = useContext(CombatantContext);

  return (
    <label css={{ flexGrow: 1 }}>
      <H.H6 css={[noMarginPadding, allSmallCaps]}>Notes</H.H6>
      <textarea
        css={{ width: '100%' }}
        value={combatant.data.notes}
        onChange={e =>
          combatant.ref.set({ notes: e.target.value }, { merge: true })
        }
      />
    </label>
  );
};

export default CombatantNotes;
