/** @jsx jsx */
import { jsx } from '@emotion/core';
import { render } from 'react-dom';
import Router from './routes';
import { TooltipContextProvider } from './components/context/TooltipContext';
import './services/Firestation';
import { WindowContextProvider } from './components/context/WindowContext';
import { UserContextProvider } from './components/context/UserContext';

function App() {
    return (
        <WindowContextProvider>
            <TooltipContextProvider>
                <UserContextProvider>
                    <Router />
                </UserContextProvider>
            </TooltipContextProvider>
        </WindowContextProvider>
    );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
