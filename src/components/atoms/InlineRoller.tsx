/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment } from 'react';
import { RollExcellency } from '../../types/Roll';
import DiceRollUnit from './DiceRollUnit';
import { underlineHighlightHover } from '../../styling/animations';

const InlineRollerAtom: FunctionComponent<{
  label?: string;
  dice: number;
  excellency?: RollExcellency;
}> = ({ label, dice, excellency }) => (
  <span
    css={[
      {
        cursor: 'pointer',
      },
      underlineHighlightHover,
    ]}
    tabIndex={0}
    role="button"
  >
    {label && `${label}: `}
    {dice} dice{' '}
    {excellency ? (
      <Fragment>
        ({excellency.maxExcellency} <DiceRollUnit unit={excellency.unit} /> for{' '}
        {excellency.maxExcellency * excellency.motesPerUnit}m)
      </Fragment>
    ) : null}
  </span>
);

export default InlineRollerAtom;
