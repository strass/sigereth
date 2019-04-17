import { Interpolation } from '@emotion/css';

export const withoutNumberSpinner: Interpolation = {
  '-moz-appearance': 'textfield',
  '::-webkit-inner-spin-button': {
    appearance: 'none',
    margin: 0,
  },
};
