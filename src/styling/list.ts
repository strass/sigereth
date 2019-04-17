import { Interpolation } from '@emotion/core';

export const unstyleList: Interpolation = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

export const verticalList: Interpolation = {
  // display: 'flex',
  // flexDirection: 'column',
};

export const horizontalList: Interpolation = {
  // display: 'flex',
  // flexDirection: 'row',
  li: {
    display: 'inline-flex',
  },
};
