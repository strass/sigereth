/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import GameOrganism from '../organisms/Game';
import { GameContext } from '../context/GameContext';
import Game from '../../types/Game';

const blankGame = (id: string) =>
  ({
    name: id,
    turn: 0,
    version: 0,
  } as Game);

const GamePage: FunctionComponent = () => {
  const { game } = useContext(GameContext);
  if (game.exists === false) {
    return (
      <button onClick={() => game.ref.set(blankGame(game.id))}>
        make game
      </button>
    );
  }
  return <GameOrganism />;
};

export default GamePage;
