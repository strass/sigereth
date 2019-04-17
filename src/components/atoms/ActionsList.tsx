/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useMemo } from 'react';
import { Roll } from '../../types/QuickCharacter';
import DiceRoll from './DiceRoll';
import { SheetValueGroup } from './SheetValue';
import { noMarginPadding } from '../../styling/normalize';

interface QuickCharacterAction {
  label: string;
  roll: Roll;
}

const ActionsList: FunctionComponent<{ actions: QuickCharacterAction[] }> = ({
  actions,
}) => {
  const formattedActions = useMemo(
    () =>
      actions.map(a => ({ label: a.label, value: <DiceRoll roll={a.roll} /> })),
    [actions]
  );
  return (
    <p css={[noMarginPadding]}>
      <span css={{ fontWeight: 'bold', display: 'inline' }}>Actions: </span>
      <SheetValueGroup values={formattedActions} boldLabels={false} />
    </p>
  );
};

export default ActionsList;
