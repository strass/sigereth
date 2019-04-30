/** @jsx jsx */
import { jsx } from '@emotion/core';
import { unstyleList } from '../../../styling/list';
import H from '../../atoms/Type/Header';
import { SheetValueGroup } from '../../atoms/SheetValue';
import ActionsList from '../../atoms/ActionsList';

// const qc = { data: {} };
// const dl: Interpolation = {
//   display: 'flex',
//   dt: {
//     fontWeight: 'bold',
//   },
//   dd: {
//     margin: 0,
//     ':not(:last-child)': { marginLeft: 2, marginRight: 2 },
//   },
// };
// const inlineDl: Interpolation = {
//   dt: {
//     display: 'inline-flex',
//   },
//   dd: {
//     display: 'inline-flex',
//   },
// };

const QuickCharacter = () => {
  return (
    <article>
      {/* <H.H1>{qc.data.name}</H.H1>
      <p>{qc.data.description}</p> */}
      <div>
        <SheetValueGroup
          values={[
            { label: 'Essence', value: 5 },
            { label: 'Willpower', value: 9 },
            { label: 'Join Battle', value: '9 dice (+5 for 5m)' },
          ]}
        />
      </div>
      <div>
        <SheetValueGroup
          values={[{ label: 'Personal', value: 16 }, { label: 'Peripheral', value: 32 }]}
        />
      </div>
      <div>
        <ActionsList
          actions={[
            {
              label: 'Administration',
              roll: {
                dice: 10,
                excellency: {
                  maxExcellency: 2,
                  unit: 'SUCCESSES' as 'SUCCESSES',
                  motesPerUnit: 2,
                },
              },
            },
            {
              label: 'Crafting',
              roll: {
                dice: 11,
                excellency: {
                  maxExcellency: 6,
                  unit: 'DICE' as 'DICE',
                  motesPerUnit: 1,
                },
              },
            },
            {
              label: 'Dynastic Education',
              roll: {
                dice: 10,
              },
            },
            {
              label: 'Read Intentions',
              roll: {
                dice: 7,
                excellency: {
                  maxExcellency: 1,
                  unit: 'SUCCESS' as 'SUCCESSES',
                  motesPerUnit: 2,
                },
              },
            },
            {
              label: 'Resist Poison/Disease',
              roll: {
                dice: 8,
                excellency: {
                  maxExcellency: 2,
                  unit: 'SUCCESS' as 'SUCCESSES',
                  motesPerUnit: 2,
                },
              },
            },
            {
              label: 'Senses',
              roll: {
                dice: 9,
                excellency: {
                  maxExcellency: 5,
                  unit: 'DICE' as 'DICE',
                  motesPerUnit: 1,
                },
              },
            },
            {
              label: 'Social Influence',
              roll: {
                dice: 10,
                excellency: {
                  maxExcellency: 2,
                  unit: 'SUCCESS' as 'SUCCESSES',
                  motesPerUnit: 2,
                },
              },
            },
            {
              label: 'Sorcery',
              roll: {
                dice: 11,
                excellency: {
                  maxExcellency: 6,
                  unit: 'DICE' as 'DICE',
                  motesPerUnit: 1,
                },
              },
            },
          ]}
        />
      </div>
      <div>
        <SheetValueGroup
          boldLabels={false}
          values={[
            { label: 'Appearance', value: 4 },
            {
              label: 'Resolve',
              value: '5 (+3 for 6m)',
            },
            {
              label: 'Guile',
              value: '3 (+1 for 2m)',
            },
          ]}
        />
      </div>

      <section>
        <H.H6
          css={{
            display: 'inline-flex',
            background: 'darkblue',
            color: 'white',
            width: '100%',
            padding: '0 4px 6px 4px',
          }}
        >
          Combat
        </H.H6>
        <ul css={[unstyleList]}>
          <li>Attack (Sword of Sorrows, jade daiklave): 12 dice (+5 for 5m, Damage 14L/5)</li>
          <li>Attack (Unarmed): 12 dice (+4 for 4m, Damage 9B)</li>
        </ul>
      </section>
      <section>
        <H.H6
          css={{
            display: 'inline-flex',
            background: 'darkblue',
            color: 'white',
            width: '100%',
            padding: '0 4px 6px 4px',
          }}
        >
          Intimacies
        </H.H6>
        <ul css={[unstyleList]}>
          <li>
            Defining Principle: I alone deserve to be Empress; I alone can restore the Realm's
            glory.
          </li>
          <li>Defining Principle: My devotion to the Immaculate Philosophy is unwavering.</li>
          <li>Defining Tie: House Mnemon (Authoritarian Pride)</li>
          <li>Major Principle: I crave the secrets of the First Age.</li>
          <li>Major Tie: The Scarlet Empress (Admiration)</li>
          <li>Major Tie: The Immaculate Order (Gratitude)</li>
          <li>Major Tie: Ragara and his house (Hatred)</li>
          <li>Minor Tie: The Anathema (Pragmatic Wariness)</li>
          <li>Minor Tie: The Sidereal Exalted (Mistrust)</li>
          <li>Minor Tie: V’neef (Resentment)</li>
        </ul>
      </section>
    </article>
  );
};

export default QuickCharacter;
