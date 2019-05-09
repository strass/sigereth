/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useState } from 'react';
import { unstyleList } from '../../../../styling/list';
import { QuickCharacterSheet } from '../../../../types/Character/Sheet';
import usePermissions from '../../../../hooks/usePermissions';
import { DocumentSnapshotExpanded } from '../../../../types/Firestore';
import { DamageType } from '../../../../types/Generic';
import { toNumber } from 'lodash';
import useCharacterSheetAction from '../../../../hooks/useCharacterSheetAction';

const AddAttack: FunctionComponent = () => {
  const dispatch = useCharacterSheetAction<QuickCharacterSheet>();
  const [newAttack, setNewAttack] = useState<QuickCharacterSheet['attacks'][0]>({
    label: '',
    roll: {
      config: { dice: 1 },
      damage: { dice: 1, type: DamageType.BASHING },
    },
  });
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        dispatch({ type: 'CREATE_ATTACK', attack: newAttack });
      }}
    >
      <label>
        Label:{' '}
        <input
          value={newAttack.label}
          onChange={e => setNewAttack({ ...newAttack, label: e.target.value })}
        />
      </label>
      <label>
        Dice:{' '}
        <input
          type="number"
          value={newAttack.roll.config.dice}
          onChange={e =>
            setNewAttack({
              ...newAttack,
              roll: {
                ...newAttack.roll,
                config: { ...newAttack.roll.config, dice: toNumber(e.target.value) },
              },
            })
          }
        />
      </label>

      <label>
        Excellency:{' '}
        <input
          type="checkbox"
          checked={!!newAttack.roll.excellency}
          onChange={() =>
            setNewAttack({
              ...newAttack,
              roll: {
                ...newAttack.roll,
                excellency: !newAttack.roll.excellency
                  ? {
                      maxExcellency: newAttack.roll.config.dice,
                      unit: 'DICE',
                      motesPerUnit: 1,
                    }
                  : undefined,
              },
            })
          }
        />
      </label>
      <button type="submit">add</button>
    </form>
  );
};

const QuickCharacterAttacks: FunctionComponent<{
  sheet: DocumentSnapshotExpanded<QuickCharacterSheet>;
}> = ({ sheet }) => {
  const attacks = sheet.data.attacks;
  const { isResourceOwner } = usePermissions(sheet);
  return (
    <ul css={[unstyleList]}>
      {attacks.map((a, i) => (
        <li key={i}>
          Attack ({a.label}): {a.roll.config.dice} dice (
          {a.roll.excellency ? (
            <Fragment>
              {' '}
              +{a.roll.excellency.maxExcellency} for{' '}
              {a.roll.excellency.maxExcellency * a.roll.excellency.motesPerUnit}m,{' '}
            </Fragment>
          ) : null}
          Damage {a.roll.damage.dice}
          {a.roll.damage.type}
          {a.roll.damage.overwhelming ? `/${a.roll.damage.overwhelming}` : ''})
        </li>
      ))}
      {isResourceOwner && (
        <li>
          <AddAttack />
        </li>
      )}
    </ul>
  );
};

export default QuickCharacterAttacks;
