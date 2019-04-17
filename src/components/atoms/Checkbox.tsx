/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, InputHTMLAttributes } from 'react';

const CheckboxAtom: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = props => (
  <input {...props} type="checkbox" />
);

export default CheckboxAtom;
