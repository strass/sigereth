/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useMemo } from 'react';
import InlineRoller from './InlineRoller';
import { SheetValueGroup } from './SheetValue';
import { noMarginPadding } from '../../styling/normalize';
import { QuickCharacterSheet } from '../../types/Character/Sheet';

const ActionsList: FunctionComponent<{ actions: QuickCharacterSheet['actions'] }> = ({
  actions,
}) => {
  const formattedActions = useMemo(
    () =>
      actions.map(a => ({
        label: a.label,
        value: <InlineRoller dice={a.roll.config.dice} excellency={a.roll.excellency} />,
      })),
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
