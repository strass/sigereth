/** @jsx jsx */
import { jsx } from '@emotion/core';
import { mount, route, compose, withView } from 'navi';
// import { Fragment } from 'react';
import { View } from 'react-navi';
import { Suspense, Fragment } from 'react';
import GameContextProvider from '../components/context/GameContext';
import { DiceContextProvider } from '../components/context/DiceContext';
import GamePage from '../components/pages/Game';
import ErrorBoundary from '../components/atoms/ErrorBoundary';
import GlobalLayout from '../components/layouts/Global';
import DevNotes from '../DevNotes';
// import GameHeader from '../components/pages/GameHeader';

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

// const Router = createBrowserRouter({
//   routeConfig: makeRouteConfig(
// <Route path="/" Component={GlobalLayout}>
//   {{
//     header: [
//       <Route Component={ErrorBoundary}>
//         <Route path="games/:gameId" Component={GameContextProvider}>
//           <Route path="/" Component={GameHeader} />
//         </Route>
//       </Route>,
//       <Route path="(.*)?" Component={() => <Fragment>default header</Fragment>} />,
//     ],
//     footer: [<Route path="(.*)?" Component={DevNotes} />],
//     main: [
//       <Route path="games">
//         <Route path=":gameId" Component={GameContextProvider}>
//           <Route Component={DiceContextProvider}>
//             <Route path="/" Component={GamePage} />
//           </Route>
//         </Route>
//         <Route path="/" Component={() => <Fragment>Games Index</Fragment>} />
//       </Route>,
//     ],
//   }}
// </Route>
//   ),
//   renderError: ({ error }) => (
//     <div>
//       {error.status === 404 ? 'Not found' : 'Error'} <Link to="/games/malfeas">to game</Link>
//     </div>
//   ),
// });

export default routes;
