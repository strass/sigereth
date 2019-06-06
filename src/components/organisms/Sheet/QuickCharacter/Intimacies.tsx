/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useState } from 'react';
import { unstyleList } from '../../../../styling/list';
import { QuickCharacterSheet } from '../../../../types/Character/Sheet';
import usePermissions from '../../../../hooks/usePermissions';
import { DocumentSnapshotExpanded } from '../../../../types/Firestore';
import useCharacterSheetAction from '../../../../hooks/useCharacterSheetAction';

const AddIntimacy: FunctionComponent = () => {
  const dispatch = useCharacterSheetAction<QuickCharacterSheet>();
  const [newIntimacy, setNewIntimacy] = useState<QuickCharacterSheet['intimacies'][0]>({
    type: 'PRINCIPLE',
    level: 'MINOR',
    description: '',
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: 'CREATE_INTIMACY', intimacy: newIntimacy });
      }}
    >
      <select
        aria-label="Intimacy Level"
        value={newIntimacy.level}
        onChange={e =>
          setNewIntimacy({
            ...newIntimacy,
            level: e.target.value as 'MAJOR' | 'MINOR' | 'DEFINING',
          })
        }
      >
        <option value="MINOR">Minor</option>
        <option value="MAJOR">Major</option>
        <option value="DEFINING">Defining</option>
      </select>
      <select
        aria-label="Intimacy Type"
        value={newIntimacy.type}
        onChange={e =>
          setNewIntimacy({ ...newIntimacy, type: e.target.value as 'PRINCIPLE' | 'TIE' })
        }
      >
        <option value="PRINCIPLE">Principle</option>
        <option value="TIE">Tie</option>
      </select>
      <input
        aria-label="Intimacy Description"
        value={newIntimacy.description}
        onChange={e => setNewIntimacy({ ...newIntimacy, description: e.target.value })}
      />
      <button type="submit">add</button>
    </form>
  );
};

const QuickCharacterIntimacies: FunctionComponent<{
  sheet: DocumentSnapshotExpanded<QuickCharacterSheet>;
}> = ({ sheet }) => {
  const intimacies = sheet.data.intimacies;
  const { isResourceOwner } = usePermissions(sheet);
  return (
    <ul css={[unstyleList]}>
      {intimacies.map((intimacy, i) => (
        <li key={i}>
          {intimacy.level} {intimacy.type}: {intimacy.description}
        </li>
      ))}
      {isResourceOwner && (
        <li>
          <AddIntimacy />
        </li>
      )}
    </ul>
  );
};

export default QuickCharacterIntimacies;
