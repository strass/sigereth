/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mount, route, compose, withView } from 'navi';
import { View } from 'react-navi';
import { Suspense, Fragment } from 'react';
import GameContextProvider from '../components/context/GameContext';
import { DiceContextProvider } from '../components/context/DiceContext';
import GamePage from '../components/pages/Game';
import ErrorBoundary from '../components/atoms/ErrorBoundary';
import GlobalLayout from '../components/layouts/Global';
import DevNotes from '../DevNotes';

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
  withView(
    <GlobalLayout header={<Fragment>header</Fragment>} footer={<DevNotes />} main={<View />} />
  ),
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
        route({ title: 'Game', view: <GamePage /> })
      ),
    }),
  })
);

export default routes;
