/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext } from 'react';
import CombatantsList from '../../molecules/CombatantsList';
import TurnDisplay from './TurnDisplay';
import { GameContext } from '../../context/GameContext';
import RollerOrganism from '../Roller';
import EventFeedOrganism from './EventFeed';

const GameOrganism: FunctionComponent = () => {
  console.debug('GameOrganism render');
  const game = useContext(GameContext);

  return (
    <div css={{ display: 'flex', flexDirection: 'row' }}>
      <div css={{ display: 'flex', flexDirection: 'column' }}>
        <h1>{game.id}</h1>
        <TurnDisplay />
        <CombatantsList />
        <RollerOrganism />
      </div>
      <EventFeedOrganism />
    </div>
  );
};

export default GameOrganism;
