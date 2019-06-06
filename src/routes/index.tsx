/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mount, route, compose, withView } from 'navi';
import { View } from 'react-navi';
import { Suspense, lazy } from 'react';
import GameContextProvider from '../components/context/GameContext';
import { DiceContextProvider } from '../components/context/DiceContext';
import GamePage from '../components/pages/Game';
import ErrorBoundary from '../components/atoms/ErrorBoundary';
import GlobalLayout from '../components/layouts/Global';
import DevNotes from '../DevNotes';
import HeaderOrganism from '../components/organisms/Header';

const LazyProfilePage = lazy(() => import('../components/pages/ProfilePage'));
const LazyGameSettingsPage = lazy(() => import('../components/pages/GameSettings'));

const withErrorBoundary = () =>
  withView(() => (
    <ErrorBoundary>
      <View />
    </ErrorBoundary>
  ));

const withSuspense = () =>
  withView(() => (
    <Suspense fallback="suspsense loading///">
      <View />
    </Suspense>
  ));

const routes = compose(
  withErrorBoundary(),
  withSuspense(),
  withView(<GlobalLayout header={<HeaderOrganism />} footer={<DevNotes />} main={<View />} />),
  mount({
    '/': route({
      title: 'root',
      getView: () => <div>hi</div>,
    }),
    '/games': mount({
      '/': route({
        title: 'Games Index',
        getView: () => <div>games index</div>,
      }),
      '/:gameId': compose(
        withView(req => (
          <GameContextProvider gameId={req.params.gameId}>
            <View />
          </GameContextProvider>
        )),
        withView(
          <DiceContextProvider>
            <View />
          </DiceContextProvider>
        ),
        // Seems like this has to be here to catch an error
        withSuspense(),
        mount({
          '/settings': route({ title: 'Game Settings', view: <LazyGameSettingsPage /> }),
          '/': route({ title: 'Game', view: <GamePage /> }),
        })
      ),
    }),
    '/profile': route({
      title: 'My Profile',
      view: <LazyProfilePage />,
    }),
  })
);

export default routes;
