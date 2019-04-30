/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useState, useCallback, FormEvent } from 'react';
import { firestore } from 'firebase';
import { defaultCombatant } from '../../../types/consts';
import { toNumber, merge } from 'lodash';
import NumberSpinner from '../../atoms/NumberSpinner';
import { getUserRecord } from '../../../services/Firestation';

const AddCombatant: FunctionComponent<{
  combatantsRef: firestore.CollectionReference;
}> = ({ combatantsRef }) => {
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState('');
  const [initiative, setInitiative] = useState(3);
  const addCombatant = useCallback<(e: FormEvent<HTMLFormElement>) => void>(
    async e => {
      e.preventDefault();
      setDisabled(true);
      await combatantsRef.add(
        merge(defaultCombatant, {
          name,
          initiative,
          turnOver: false,
          owner: getUserRecord(),
          motes: {
            personal: null,
            peripheral: null,
            hasRegainedMotesThisTurn: true,
          },
        })
      );
      setName('');
      setInitiative(3);
      setDisabled(false);
    },
    [name, initiative, combatantsRef]
  );
  return (
    <form onSubmit={addCombatant}>
      <fieldset css={{ width: 'fit-content' }} disabled={disabled}>
        <legend>Add Combatant</legend>
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            maxWidth: 500,
            minWidth: 400,
            flexDirection: 'column',
          }}
        >
          <div css={{ display: 'flex', justifyContent: 'space-between' }}>
            <label css={{ display: 'flex', flexBasis: '60%', marginRight: '5%' }}>
              <span>Name: </span>
              <input name="name" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label css={{ display: 'flex', flexBasis: '30%' }}>
              <span>Initiative: </span>
              <NumberSpinner
                value={initiative}
                onChange={e => setInitiative(toNumber(e.target.value))}
              />
            </label>
          </div>
          <input
            type="submit"
            value="Add"
            css={{ flexBasis: '100%', flexGrow: 0, flexShrink: 0 }}
          />
        </div>
      </fieldset>
    </form>
  );
};

export default AddCombatant;
