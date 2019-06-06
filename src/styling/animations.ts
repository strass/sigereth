import { Interpolation } from '@emotion/core';

export const underlineHighlightHover: Interpolation = {
  textDecoration: 'none',
  padding: '0 2px',
  display: 'inline',
  backgroundImage: 'linear-gradient(to bottom, transparent 20%, skyblue 21%)',
  backgroundPosition: 'bottom',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 1px',
  transition: 'background-size 0.4s ease-in-out 0.2s',
  ':hover, :focus': {
    backgroundSize: '100% 130%',
    transitionDelay: '0s',
  },
  ':focus': {
    outline: 'none',
  },
};
