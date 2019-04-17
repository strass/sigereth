import { useContext, useCallback } from 'react';
import { CombatantContext } from '../components/context/CombatantContext';
import { MoteType, DamageType } from '../types/Generic';
import { DocumentSnapshotExpanded } from '../types/Firestore';
import Combatant from '../types/Combatant';
import omitUndefined from '../util/omitUndefined';
import { clamp } from 'lodash';

type Action<Type extends string, I extends object> = { type: Type } & I;

type CombatantAction =
  | Action<
      'SET_MOTES',
      { moteType: MoteType; current?: number; total?: number }
    >
  | Action<'DAMAGE', { damageType: DamageType; amount: number }>;

const combatantActionReducer = (
  action: CombatantAction,
  combatant: DocumentSnapshotExpanded<Combatant>
) => {
  console.groupCollapsed(`Running action '${action.type}'`);
  console.log(action);
  console.groupEnd();
  switch (action.type) {
    case 'SET_MOTES': {
      return combatant.ref.set(
        {
          motes: {
            [action.moteType]: omitUndefined({
              current:
                action.current !== undefined
                  ? clamp(action.current, -99, 999)
                  : undefined,
              total:
                action.total !== undefined
                  ? clamp(action.total, -99, 999)
                  : undefined,
            }),
          } as Partial<Combatant['motes']>,
        } as Partial<Combatant>,
        { merge: true }
      );
    }
    case 'DAMAGE':
      return combatant.ref.set(
        {
          health: {
            damage: {
              [action.damageType]: Math.max(
                combatant.data.health.damage[action.damageType] + action.amount,
                0
              ),
            },
          },
        },
        { merge: true }
      );
  }
};

const useCombatantAction = () => {
  const combatant = useContext(CombatantContext);
  const dispatch = useCallback(
    (action: CombatantAction) => combatantActionReducer(action, combatant),
    [combatant]
  );
  return dispatch;
};

export default useCombatantAction;
