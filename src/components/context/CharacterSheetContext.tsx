/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createContext, FunctionComponent } from 'react';
import { firestore } from 'firebase';
import { DocumentSnapshotExpanded } from '../../types/Firestore';
import CharacterSheet from '../../types/Character/Sheet';
import useFirestore from '../../hooks/useFirestore';

const CharacterSheetContext = createContext<DocumentSnapshotExpanded<CharacterSheet>>(
  (null as unknown) as DocumentSnapshotExpanded<CharacterSheet>
);

export const CharacterSheetContextProvider: FunctionComponent<{
  sheet: firestore.DocumentReference;
}> = ({ sheet: sheetRef, children }) => {
  const [sheet] = useFirestore<CharacterSheet>(sheetRef);
  return (
    <CharacterSheetContext.Provider value={sheet}>
      {sheet ? children : 'loading'}
    </CharacterSheetContext.Provider>
  );
};

export default CharacterSheetContext;
