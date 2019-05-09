/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, memo, useState, Fragment } from 'react';
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
import CombatantName from './Name';
import CombatantAvatar from './Avatar';
import Modal from '../../atoms/Modal';
import DraggableWindow from '../../atoms/DraggableWindow';
import usePermissions from '../../../hooks/usePermissions';
import CharacterSheetOrganism from '../../organisms/Sheet';
import { CharacterSheetContextProvider } from '../../context/CharacterSheetContext';
import { firestore } from 'firebase';

const CombatantItem: FunctionComponent<{ isActive: boolean }> = ({ isActive }) => {
  const [modalState, setModal] = useState<false | 'window' | 'modal'>(false);
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);
  const [detailsOpen, setDetailsOpen] = useState(false);
  return (
    <Fragment>
      <div
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
          background: 'white',
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
          <li css={[flexCenter]}>
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
            <button onClick={() => setModal(modalState ? false : 'modal')} type="button">
              □
            </button>
            {isResourceOwnerOrGameOwner && (
              <button
                type="button"
                css={{ marginLeft: 'auto' }}
                onClick={() => combatant.ref.delete()}
              >
                x
              </button>
            )}
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
      </div>
      <Modal mount={!!modalState}>
        <DraggableWindow
          closePortal={() => setModal(false)}
          isWindow={modalState === 'window'}
          windowPopOut={() => setModal('window')}
          windowShrink={() => setModal('modal')}
        >
          <CharacterSheetContextProvider
            sheet={
              combatant.data.sheet ||
              (combatant.ref.parent.parent as firestore.DocumentReference)
                .collection('sheets')
                .doc(combatant.id)
            }
          >
            <CharacterSheetOrganism />
          </CharacterSheetContextProvider>
        </DraggableWindow>
      </Modal>
    </Fragment>
  );
};

export default memo(CombatantItem);
