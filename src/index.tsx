/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { render } from 'react-dom';
import Router from './routes';
import { TooltipContextProvider } from './components/context/TooltipContext';
import './services/Firestation';
import { WindowContextProvider } from './components/context/WindowContext';

function App() {
  return (
    <WindowContextProvider>
      <TooltipContextProvider>
        <Router />
      </TooltipContextProvider>
    </WindowContextProvider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
