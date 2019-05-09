/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, useEffect, Fragment } from 'react';
import CharacterSheetContext from '../../context/CharacterSheetContext';
import QuickCharacter from './QuickCharacter';
import { QuickCharacterSheet } from '../../../types/Character/Sheet';
import { DocumentSnapshotExpanded } from '../../../types/Firestore';
import { defaultQuickCharacter } from '../../../types/consts';
import { getUserRecord } from '../../../services/Firestation';

const CharacterSheetOrganism: FunctionComponent<{
  children?: never;
}> = () => {
  const sheet = useContext(CharacterSheetContext);

  useEffect(() => {
    if (sheet && sheet.exists === false) {
      sheet.ref.set({ ...defaultQuickCharacter, owner: getUserRecord() });
    }
  });
  if (sheet.exists === false) {
    return <Fragment>creating...</Fragment>;
  }
  console.log(sheet);

  return (
    <div css={{ display: 'flex', flexDirection: 'column' }}>
      <ul>
        <li>{sheet.data.type === 'QUICK_CHARACTER_SHEET' && 'x'} Quick Character</li>
        <li>{sheet.data.type === 'FULL_CHARACTER_SHEET' && 'x'} Full Character</li>
      </ul>
      {
        {
          QUICK_CHARACTER_SHEET: (
            <QuickCharacter sheet={sheet as DocumentSnapshotExpanded<QuickCharacterSheet>} />
          ),
          // FULL_CHARACTER_SHEET: <FullCharacter />,
        }[sheet.data.type]
      }
    </div>
  );
};

export default CharacterSheetOrganism;
