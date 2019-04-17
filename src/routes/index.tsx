/** @jsx jsx */
import { jsx } from '@emotion/core';
import createBrowserRouter from 'found/lib/createBrowserRouter';
import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import GameContextProvider from '../components/context/GameContext';
import GlobalLayout from '../components/layouts/Global';
import GamePage from '../components/pages/Game';
import GameHeader from '../components/pages/GameHeader';
import { Fragment } from 'react';
import DevNotes from '../DevNotes';
import ErrorBoundary from '../components/atoms/ErrorBoundary';

const Router = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <Route path="/" Component={GlobalLayout}>
      {{
        header: [
          <Route Component={ErrorBoundary}>
            <Route path="games/:gameId" Component={GameContextProvider}>
              <Route path="/" Component={GameHeader} />
            </Route>
          </Route>,
          <Route
            path="(.*)?"
            Component={() => <Fragment>default header</Fragment>}
          />,
        ],
        footer: [<Route path="(.*)?" Component={DevNotes} />],
        main: [
          <Route path="games">
            <Route path=":gameId" Component={GameContextProvider}>
              <Route path="/" Component={GamePage} />
            </Route>
            <Route
              path="/"
              Component={() => <Fragment>Games Index</Fragment>}
            />
          </Route>,
        ],
      }}
    </Route>
  ),

  renderError: ({ error }) => (
    <div>{error.status === 404 ? 'Not found' : 'Error'}</div>
  ),
});

export default Router;
