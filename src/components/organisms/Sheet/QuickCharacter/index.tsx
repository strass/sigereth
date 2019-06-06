/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment } from 'react';
import H from '../../../atoms/Type/Header';
import { DeepPartial } from 'utility-types';
import { SheetValueGroup } from '../../../atoms/SheetValue';
import { QuickCharacterSheet } from '../../../../types/Character/Sheet';
import { DocumentSnapshotExpanded } from '../../../../types/Firestore';
import InlineRollerAtom from '../../../atoms/InlineRoller';
import { RollInput } from '../../../../types/Roll';
import ActionsList from '../../../atoms/ActionsList';
import QuickCharacterAttacks from './Attacks';
import QuickCharacterIntimacies from './Intimacies';

const QuickCharacter: FunctionComponent<{
  sheet: DocumentSnapshotExpanded<QuickCharacterSheet>;
}> = ({ sheet }) => {
  return (
    <article>
      <H.H1>{sheet.data.name}</H.H1>
      <p>{sheet.data.description}</p>
      <div>
        <SheetValueGroup
          values={[
            { label: 'Essence', value: sheet.data.essence },
            { label: 'Willpower', value: sheet.data.willpower.permanent },
            {
              label: 'Join Battle',
              value: (
                <Fragment>
                  <InlineRollerAtom
                    dice={sheet.data.joinBattle.config.dice}
                    excellency={sheet.data.joinBattle.excellency}
                  />
                  {!sheet.data.joinBattle.excellency && (
                    <button
                      title="demo: add excellency"
                      css={{
                        display: 'inline-flex',
                        height: '1em',
                        width: '1em',
                        lineHeight: '1em',
                        borderRadius: '50%',
                        backgroundColor: 'skyblue',
                        alignContent: 'center',
                        justifyContent: 'center',
                        border: 'none',
                      }}
                      onClick={() =>
                        sheet.ref.set(
                          {
                            joinBattle: {
                              excellency: { maxExcellency: 6, unit: 'DICE', motesPerUnit: 1 },
                            },
                          } as DeepPartial<RollInput>,
                          { merge: true }
                        )
                      }
                      type="button"
                    >
                      +
                    </button>
                  )}
                </Fragment>
              ),
            },
          ]}
        />
      </div>
      <div>
        !
        <SheetValueGroup
          values={[{ label: 'Personal', value: 16 }, { label: 'Peripheral', value: 32 }]}
        />
      </div>
      <div>
        <ActionsList actions={sheet.data.actions} />
      </div>

      <div>
        <SheetValueGroup
          boldLabels={false}
          values={[
            {
              label: 'Appearance',
              value: (
                <InlineRollerAtom
                  dice={sheet.data.appearance.value}
                  excellency={sheet.data.appearance.excellency}
                />
              ),
            },
            {
              label: 'Resolve',
              value: (
                <InlineRollerAtom
                  dice={sheet.data.resolve.value}
                  excellency={sheet.data.resolve.excellency}
                />
              ),
            },
            {
              label: 'Guile',
              value: (
                <InlineRollerAtom
                  dice={sheet.data.guile.value}
                  excellency={sheet.data.guile.excellency}
                />
              ),
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
        <QuickCharacterAttacks sheet={sheet} />
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
        <QuickCharacterIntimacies sheet={sheet} />
      </section>
    </article>
  );
};

export default QuickCharacter;
