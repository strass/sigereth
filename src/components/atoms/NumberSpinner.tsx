/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, InputHTMLAttributes, ChangeEvent } from 'react';
import { Omit } from 'lodash';
import { withoutNumberSpinner as withoutNumberSpinnerCss } from '../../styling/input';

const spinnerButtonCss = {
  borderRadius: '50%',
  border: '1px solid transparent',
  margin: 0,
  padding: 0,
  width: '1.5em',
  height: '1.5em',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  ':disabled': {
    background: 'white',
    borderColor: 'lightgrey',
  },
};

const NumberSpinner: FunctionComponent<{
  value: number;
  onChange: InputHTMLAttributes<HTMLInputElement>['onChange'];
  withoutNumberSpinner?: boolean;
  name?: string;
  id?: string;
  min?: InputHTMLAttributes<HTMLInputElement>['min'];
  max?: InputHTMLAttributes<HTMLInputElement>['max'];
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'min' | 'id' | 'max' | 'onChange' | 'value' | 'name'
  >;
  className?: string;
  readOnly?: boolean;
}> = ({
  value,
  onChange,
  withoutNumberSpinner = true,
  name,
  id,
  min,
  max,
  className,
  inputProps,
  readOnly,
}) => (
  <React.Fragment>
    <button
      type="button"
      css={[spinnerButtonCss, readOnly && { visibility: 'hidden' }]}
      onClick={() =>
        onChange &&
        onChange(({ target: { value: value - 1 } } as unknown) as ChangeEvent<HTMLInputElement>)
      }
      disabled={readOnly || value === min}
    >
      -
    </button>
    <input
      {...inputProps}
      value={value}
      css={[
        withoutNumberSpinner && withoutNumberSpinnerCss,
        {
          marginLeft: 4,
          marginRight: 4,
          width: '3.5ex',
          fontVariantNumeric: 'tabular-nums',
          textAlign: 'center',
        },
        readOnly && {
          outline: 'none',
          ':focus': { outline: 'none' },
          cursor: 'default',
        },
      ]}
      onChange={onChange}
      type="number"
      name={name}
      id={id || name}
      min={min}
      max={max}
      className={className}
      readOnly={readOnly}
    />
    <button
      type="button"
      css={[spinnerButtonCss, readOnly && { visibility: 'hidden' }]}
      onClick={() =>
        onChange &&
        onChange(({ target: { value: value + 1 } } as unknown) as ChangeEvent<HTMLInputElement>)
      }
      disabled={readOnly || value === max}
    >
      +
    </button>
  </React.Fragment>
);

export default NumberSpinner;
