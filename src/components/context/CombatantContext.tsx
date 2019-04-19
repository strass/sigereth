/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, createContext, useMemo, memo } from 'react';
import Combatant from '../../types/Combatant';
import { DocumentSnapshotExpanded } from '../../types/Firestore';
import useFirestore from '../../hooks/useFirestore';
import { store } from '../../services/Firestation';
import CombatantItem from '../molecules/CombatantsList/CombatantItem';

export const CombatantContext = createContext(
  (null as unknown) as DocumentSnapshotExpanded<Combatant>
);

const CombatantWithContext: FunctionComponent<{
  combatantPath: string;
  isActive: boolean;
  children?: never;
}> = ({ combatantPath, isActive }) => {
  console.log(combatantPath);
  const combatantRef = useMemo(() => store.doc(combatantPath), [combatantPath]);
  const [combatant] = useFirestore<Combatant>(combatantRef);
  return (
    <CombatantContext.Provider value={combatant}>
      {!!combatant ? (
        <CombatantItem isActive={isActive} />
      ) : (
        <span>Loading...</span>
      )}
    </CombatantContext.Provider>
  );
};

export default memo(CombatantWithContext);
