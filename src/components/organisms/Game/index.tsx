/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { FunctionComponent, useContext } from 'react';
import CombatantsList from '../../molecules/CombatantsList';
import TurnDisplay from './TurnDisplay';
import { GameContext } from '../../context/GameContext';

const GameOrganism: FunctionComponent = () => {
  const { game } = useContext(GameContext);
  return (
    <React.Fragment>
      <h1>{game.id}</h1>
      <TurnDisplay />
      <CombatantsList />
    </React.Fragment>
  );
};

export default GameOrganism;
