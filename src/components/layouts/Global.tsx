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
          {
            'html, body, #root': {
              height: '100%',
            },
            '#root': {
              display: 'flex',
              flexDirection: 'column',
            },
          },
        ]}
      />
      <header
        css={{
          display: 'flex',
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: 'auto',
          flexDirection: 'column',
        }}
      >
        {header}
      </header>
      <main
        css={{
          display: 'flex',
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 'auto',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {main}
      </main>
      <footer
        css={{
          display: 'flex',
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: 'auto',
          flexDirection: 'column',
        }}
      >
        {footer}
      </footer>
    </Fragment>
  );
};

export default GlobalLayout;
