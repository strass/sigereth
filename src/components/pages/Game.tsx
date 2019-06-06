/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import { firestore } from 'firebase';
import GameOrganism from '../organisms/Game';
import { GameContext } from '../context/GameContext';
import Game from '../../types/Game';
import { getUserRecord } from '../../services/Firestation';

const blankGame = (id: string): Game => ({
  name: id,
  turn: 0,
  owner: getUserRecord() as firestore.DocumentReference,
  players: [],
});

const GamePage: FunctionComponent = () => {
  console.debug('GamePage render');
  const game = useContext(GameContext);
  if (game.exists === false) {
    return (
      <button type="button" onClick={() => game.ref.set(blankGame(game.id))}>
        make game
      </button>
    );
  }
  return <GameOrganism />;
};

export default GamePage;
