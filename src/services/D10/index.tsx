import { sample, range, times, flattenDeep } from 'lodash';
import Roll from '../../types/Roll';

const rollD10 = () => sample(range(1, 10)) as number;

const cascadeRoll: (dice: number, reroll?: number[], prev?: number[]) => (number | number[])[] = (
  dice,
  reroll = [],
  prev = []
) =>
  times(dice, () => {
    const result = rollD10();
    return reroll.includes(result)
      ? (cascadeRoll(1, reroll, [...prev, result]) as number[])
      : ([result] as number[]);
  });

const countSuccesses = (
  roll: number[],
  double: number[] = [10],
  autosuccesses: number = 0,
  targetNumber = 7
) =>
  roll.reduce(
    (successes, result) =>
      // eslint-disable-next-line no-nested-ternary
      successes + (result >= targetNumber ? (double.includes(result) ? 2 : 1) : 0),
    autosuccesses
  );

const roll: (config: Roll['config']) => Roll['result'] = config => {
  const unflatDiceRolled = cascadeRoll(config.dice, config.reroll);
  const diceRolled = flattenDeep(unflatDiceRolled) as number[];
  const successes = countSuccesses(
    diceRolled,
    config.double,
    config.autosuccesses,
    config.targetNumber
  );
  return {
    successes,
    isBotch: successes === 0 && diceRolled.includes(1),
    roll: diceRolled as number[],
  };
};

export default { roll };
