/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, ReactNode } from 'react';
import { unstyleList, horizontalList } from '../../styling/list';
import { noMarginPadding } from '../../styling/normalize';

interface SheetValueProps {
  label: string;
  boldLabels?: boolean;
  value: number | string | ReactNode;
}

export const SHEET_VALUE_PADDING_LEFT = '0.25em';

const SheetValue: FunctionComponent<SheetValueProps> = ({
  label,
  value,
  boldLabels = true,
}) => {
  return (
    <span
      css={{
        display: 'inline',
        '& + .sheet-value': { paddingLeft: SHEET_VALUE_PADDING_LEFT },
      }}
      className="sheet-value"
    >
      <label
        css={{ display: 'inline', fontWeight: boldLabels ? 'bold' : undefined }}
      >
        {label}:{' '}
      </label>
      <span>{value};</span>
    </span>
  );
};

export default SheetValue;

export const SheetValueGroup: FunctionComponent<{
  values: SheetValueProps[];
  boldLabels?: boolean;
}> = ({ values, boldLabels }) => (
  <ul
    css={[
      unstyleList,
      noMarginPadding,
      horizontalList,
      { display: 'inline', li: { display: 'inline' } },
      { 'li + li': { paddingLeft: SHEET_VALUE_PADDING_LEFT } },
    ]}
  >
    {values.map(sv => (
      <li key={sv.label}>
        <SheetValue {...sv} boldLabels={boldLabels} />
      </li>
    ))}
  </ul>
);
