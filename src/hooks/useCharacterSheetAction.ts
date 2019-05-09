import { useContext, useCallback } from 'react';
import { DocumentSnapshotExpanded } from '../types/Firestore';
import { store } from '../services/Firestation';
import { Action } from '../types/Generic';
import CharacterSheetContext from '../components/context/CharacterSheetContext';
import CharacterSheet, { QuickCharacterSheet } from '../types/Character/Sheet';
import { firestore } from 'firebase';

type CharacterSheetActions<T extends CharacterSheet['type']> = {
  QUICK_CHARACTER_SHEET: Action<'CREATE_ATTACK', { attack: QuickCharacterSheet['attacks'][0] }>;
  FULL_CHARACTER_SHEET: Action<'test', {}>;
}[T];

const characterSheetActionReducer = (
  sheet: DocumentSnapshotExpanded<CharacterSheet>,
  action: CharacterSheetActions<typeof sheet.data.type>
) => {
  console.groupCollapsed(`Running action '${action.type}'`);
  console.log(action);
  const batch = store.batch();
  switch (action.type) {
    case 'CREATE_ATTACK':
      batch.update(sheet.ref, { attacks: firestore.FieldValue.arrayUnion(action.attack) });
      break;
    default:
      console.error('No action handler for action type');
      break;
  }
  console.groupEnd();
  return batch.commit();
};

const useCharacterSheetAction = <T extends CharacterSheet>() => {
  const sheet = useContext(CharacterSheetContext);
  const dispatch = useCallback(
    (action: CharacterSheetActions<T['type']>) => characterSheetActionReducer(sheet, action),
    [sheet]
  );
  return dispatch;
};

export default useCharacterSheetAction;
