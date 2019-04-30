/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, memo, useState } from 'react';
import { Collapse } from 'react-collapse';
import MoteDisplay from './MoteDisplay';
import Willpower from './Willpower';
import Onslaught from './Onslaught';
import Health from './Health';
import Defense from './Defense';
import Initiative from './Initiative';
import Notes from './Notes';
import { CombatantContext } from '../../context/CombatantContext';
import { horizontalList, unstyleList } from '../../../styling/list';
import { flexCenter } from '../../../styling/flex';
import WindowContext from '../../context/WindowContext';
import CombatantName from './Name';
import CombatantAvatar from './Avatar';

const CombatantItem: FunctionComponent<{ isActive: boolean }> = ({ isActive }) => {
  const { dispatch } = useContext(WindowContext);
  const combatant = useContext(CombatantContext);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <li
      css={{
        maxWidth: 600,
        display: 'flex',
        flexWrap: 'wrap',
        margin: '24px 0',
        padding: 4,
        border: `1px solid ${!combatant.data.turnOver ? 'black' : 'grey'}`,
        borderRadius: 6,
        boxShadow: !isActive
          ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
          : '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        transition: 'box-shadow 0.3s cubic-bezier(.25,.8,.25,1)',
        position: 'relative',
      }}
    >
      <ul
        css={[
          unstyleList,
          horizontalList,
          {
            display: 'flex',
            flexGrow: 1,
            'li:not(:last-child)': { marginRight: 12 },
          },
        ]}
      >
        <li
          css={[
            flexCenter,
            {
              height: 50,
              width: 50,
              borderRadius: '50%',
              background: 'lightgrey',
              border: '1px solid grey',
            },
          ]}
        >
          <CombatantAvatar />
        </li>
        <li css={{ display: 'flex' }}>
          <Initiative />
        </li>
        <li css={{ flexGrow: 1 }}>
          <CombatantName />
        </li>
        <li>
          <button onClick={() => setDetailsOpen(!detailsOpen)} type="button">
            {detailsOpen ? '^' : 'v'}
          </button>
          <button
            onClick={() => dispatch({ type: 'ADD_WINDOW', ref: combatant.ref })}
            type="button"
          >
            □
          </button>
          <button type="button" css={{ marginLeft: 'auto' }} onClick={() => combatant.ref.delete()}>
            x
          </button>
        </li>
      </ul>
      <Collapse
        isOpened={detailsOpen}
        css={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <div
          css={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            flexBasis: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Onslaught />
          <Defense />
          <Health />
          <MoteDisplay />
          <Willpower />
        </div>
        <div
          css={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1,
            flexBasis: '100%',
          }}
        >
          <Notes />
        </div>
      </Collapse>
    </li>
  );
};

export default memo(CombatantItem);
