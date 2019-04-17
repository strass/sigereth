/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { Roll } from '../../types/QuickCharacter';

const DiceRoll: FunctionComponent<{ label?: string; roll: Roll }> = ({
  roll,
}) => (
  <span
    css={{
      borderBottom: '1px dashed lightgrey',
      cursor: 'pointer',
      ':hover, :focus': {
        borderBottomColor: 'grey',
        outline: 'none',
      },
    }}
    tabIndex={1}
  >
    {roll.dice} dice
    {roll.excellency
      ? ` (+${roll.excellency.maxExcellency} ${roll.excellency.unit} for ${roll
          .excellency.maxExcellency * roll.excellency.motesPerUnit}m)`
      : null}
  </span>
);

export default DiceRoll;
