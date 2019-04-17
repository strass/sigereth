/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment } from 'react';
import { firestore } from 'firebase';
import useFirestore from '../../../hooks/useFirestore';
import Combatant from '../../../types/Combatant';
import QuickCharacter from '../../molecules/QuickCharacter';
import { noMarginPadding } from '../../../styling/normalize';

const CombatantWindowContent: FunctionComponent<{
  children?: never;
  firestoreRef: firestore.DocumentReference;
}> = ({ firestoreRef }) => {
  const [combatant] = useFirestore<Combatant>(firestoreRef);
  if (combatant === null) return <Fragment>loading</Fragment>;
  return (
    <div css={{ display: 'flex', flexDirection: 'column' }}>
      <h1 css={[noMarginPadding]}>{combatant.data.name}</h1>
      <QuickCharacter />
    </div>
  );
};

const WindowContent: FunctionComponent<{
  children?: never;
  firestoreRef: firestore.DocumentReference;
}> = ({ firestoreRef }) => {
  const windowType = firestoreRef.path.split('/').reverse()[1];
  console.groupCollapsed(`window ${firestoreRef.path}`);
  console.log(windowType);
  console.groupEnd();

  switch (windowType) {
    case 'combatants':
      return <CombatantWindowContent firestoreRef={firestoreRef} />;
    default:
      return null;
  }
};

export default WindowContent;
