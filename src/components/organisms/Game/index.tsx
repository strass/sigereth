/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, Fragment } from 'react';
import CombatantsList from '../../molecules/CombatantsList';
import TurnDisplay from './TurnDisplay';
import { GameContext } from '../../context/GameContext';
import EventFeedOrganism from './EventFeed';
import { Link } from 'react-navi';
import FooterToolbarOrganism from '../FooterToolbar';

const GameOrganism: FunctionComponent = () => {
  console.debug('GameOrganism render');
  const game = useContext(GameContext);

  return (
    <Fragment>
      <div css={{ display: 'flex', flexDirection: 'row' }}>
        <div css={{ display: 'flex', flexDirection: 'column' }}>
          <h1>{game.id}</h1>
          <Link href={'settings'}>Link to game settings</Link>
          <TurnDisplay />
          <CombatantsList />
        </div>
        <EventFeedOrganism />
      </div>
      <FooterToolbarOrganism />
    </Fragment>
  );
};

export default GameOrganism;
