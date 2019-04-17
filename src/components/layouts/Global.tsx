/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core';
import normalize from '../../styling/normalize';
import { exaltedFontFaces } from '../atoms/Type/fonts';
import { Fragment, FunctionComponent, ReactNode } from 'react';

const GlobalLayout: FunctionComponent<{
  header: ReactNode;
  main: ReactNode;
  footer: ReactNode;
}> = ({ header, main, footer }) => {
  return (
    <Fragment>
      <Global
        styles={[
          css(normalize),
          exaltedFontFaces,
          {
            html: {
              fontSize: '16px',
            },
          },
          { '*, *::after, *::before': { boxSizing: 'border-box' } },
          { figure: { margin: 0 } },
        ]}
      />
      <header>{header}</header>
      <main>{main}</main>
      <footer>{footer}</footer>
    </Fragment>
  );
};

export default GlobalLayout;
