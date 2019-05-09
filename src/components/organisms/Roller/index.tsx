/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import { toNumber, times, without } from 'lodash';
import useRoll from '../../../hooks/useRoll';
import DiceContext from '../../context/DiceContext';

const RollerOrganism = () => {
  console.debug('RollerOrganism render');
  const { rollDice } = useContext(DiceContext);
  const [, rollConfig, setRoll] = useRoll();
  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await rollDice(rollConfig);
      }}
      css={{ width: 'fit-content' }}
    >
      <fieldset css={{ display: 'flex', flexDirection: 'column' }}>
        <legend>Roll</legend>
        <label>
          Dice:{' '}
          <input
            type="number"
            value={rollConfig.dice}
            onChange={e => setRoll({ type: 'dice', dice: toNumber(e.target.value) })}
          />
        </label>

        <label>
          Double:{' '}
          {times(10, f => {
            const face = f + 1;

            return (
              <label key={f}>
                <span>{face}</span>
                <input
                  type="checkbox"
                  checked={rollConfig.double && rollConfig.double.includes(face)}
                  onChange={() =>
                    setRoll({
                      type: 'double',
                      double:
                        rollConfig.double && rollConfig.double.includes(face)
                          ? without(rollConfig.double, face)
                          : [...(rollConfig.double || []), face],
                    })
                  }
                />
              </label>
            );
          })}
        </label>

        <label>
          Reroll:{' '}
          {times(10, f => {
            const face = f + 1;

            return (
              <label key={f}>
                <span>{face}</span>
                <input
                  type="checkbox"
                  checked={rollConfig.reroll && rollConfig.reroll.includes(face)}
                  onChange={() =>
                    setRoll({
                      type: 'reroll',
                      reroll:
                        rollConfig.reroll && rollConfig.reroll.includes(face)
                          ? without(rollConfig.reroll, face)
                          : [...(rollConfig.reroll || []), face],
                    })
                  }
                />
              </label>
            );
          })}
        </label>

        <label>
          Autosuccesses:{' '}
          <input
            type="number"
            value={rollConfig.autosuccesses}
            onChange={e =>
              setRoll({ type: 'autosuccesses', autosuccesses: toNumber(e.target.value) })
            }
          />
        </label>

        <label>
          Target Number: {rollConfig.targetNumber}
          <input
            type="range"
            min="1"
            max="10"
            value={rollConfig.targetNumber}
            onChange={e =>
              setRoll({ type: 'targetNumber', targetNumber: toNumber(e.target.value) })
            }
          />
        </label>

        <button type="submit" css={{ width: '100%' }}>
          Roll
        </button>
      </fieldset>
    </form>
  );
};

export default RollerOrganism;
