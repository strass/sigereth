import { useContext, useCallback } from 'react';
import { clamp } from 'lodash';
import { CombatantContext } from '../components/context/CombatantContext';
import { MoteType, DamageType } from '../types/Generic';
import { DocumentSnapshotExpanded } from '../types/Firestore';
import Combatant from '../types/Combatant';
import omitUndefined from '../util/omitUndefined';
import { store } from '../services/Firestation';

type Action<Type extends string, I extends object = {}> = { type: Type } & I;

type CombatantAction =
  | Action<'TOGGLE_TURN_OVER'>
  | Action<'SET_INITIATIVE', { initiative: number }>
  | Action<'SET_NAME', { name: string }>
  | Action<'SET_ONSLAUGHT', { onslaught: number }>
  | Action<'SET_IGNORE_ONSLAUGHT', { ignoreOnslaught: false | 'SCENELONG' | 'TURN_END' }>
  | Action<'SET_DEFENSE_DODGE', { dodge: number }>
  | Action<'SET_DEFENSE_PARRY', { parry: number }>
  | Action<'DAMAGE', { damageType: DamageType; amount: number }>
  | Action<'SET_MOTES', { moteType: MoteType; current?: number; total?: number }>
  | Action<'SET_WILLPOWER', { willpower: number }>;

const combatantActionReducer = (
  action: CombatantAction,
  combatant: DocumentSnapshotExpanded<Combatant>
) => {
  console.groupCollapsed(`Running action '${action.type}'`);
  console.log(action);
  const batch = store.batch();
  switch (action.type) {
    case 'TOGGLE_TURN_OVER': {
      batch.update(combatant.ref, 'turnOver', !combatant.data.turnOver);
      break;
    }
    case 'SET_INITIATIVE': {
      batch.update(combatant.ref, 'initiative', clamp(action.initiative, -99, 999));
      break;
    }
    case 'SET_NAME': {
      batch.update(combatant.ref, 'name', action.name);
      break;
    }
    case 'SET_ONSLAUGHT': {
      batch.update(combatant.ref, 'onslaught', clamp(action.onslaught, 0, 99));
      break;
    }
    case 'SET_DEFENSE_DODGE': {
      batch.update(combatant.ref, 'dodge', action.dodge);
      break;
    }
    case 'SET_DEFENSE_PARRY': {
      batch.update(combatant.ref, 'parry', action.parry);
      break;
    }
    case 'SET_IGNORE_ONSLAUGHT': {
      batch.update(combatant.ref, 'ignoreOnslaught', action.ignoreOnslaught);
      break;
    }
    // TODO: I think
    case 'DAMAGE': {
      batch.update(
        combatant.ref,
        `health.damage.${action.damageType}`,
        Math.max(combatant.data.health.damage[action.damageType] + action.amount, 0)
      );
      break;
    }
    case 'SET_MOTES': {
      batch.set(
        combatant.ref,
        {
          motes: {
            [action.moteType]: omitUndefined({
              current: action.current !== undefined ? clamp(action.current, -99, 999) : undefined,
              total: action.total !== undefined ? clamp(action.total, -99, 999) : undefined,
            }),
          },
        },
        { merge: true }
      );
      break;
    }
    case 'SET_WILLPOWER': {
      batch.update(combatant.ref, 'willpower.temporary', action.willpower);
      break;
    }
    default:
      console.error(`No action handler for action type '${action.type}`);
  }
  console.groupEnd();
  return batch.commit();
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
