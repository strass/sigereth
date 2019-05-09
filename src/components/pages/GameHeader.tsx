/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import H from '../atoms/Type/Header';

const GameHeader: FunctionComponent = () => {
  const game = useContext(GameContext);
  if (game.exists) {
    return (
      <Fragment>
        <H.H1>{game.data.name}</H.H1>
        {game.data.version < 1000 && (
          <H.H2>
            This is a beta version of the sigereth game data format and it may
            be deleted for compatibility reasons
          </H.H2>
        )}
      </Fragment>
    );
  } else {
    return <Fragment>Game {game.id} does not exist</Fragment>;
  }
};

export default GameHeader;
