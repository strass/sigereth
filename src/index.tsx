/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactDOM, { render } from 'react-dom';
import { Router } from 'react-navi';
import routes from './routes';
import { TooltipContextProvider } from './components/context/TooltipContext';
import './services/Firestation';
import { UserContextProvider } from './components/context/UserContext';
import React from 'react';

function App() {
  return (
    <TooltipContextProvider>
      <UserContextProvider>
        <Router routes={routes} />
      </UserContextProvider>
    </TooltipContextProvider>
  );
}

if (process.env.NODE_ENV !== 'production') {
  import('react-axe').then(axe => {
    // @ts-ignore
    axe.default(React, ReactDOM, 1000);
    render(<App />, document.getElementById('root'));
  });
} else {
  render(<App />, document.getElementById('root'));
}
