/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useState } from 'react';
import { noMarginPadding } from '../../../styling/normalize';
import { flexCenter } from '../../../styling/flex';
import { allSmallCaps, textAlignCenter } from '../../../styling/type';
import { tinyButton } from '../../../styling/button';
import { useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import usePopper from '../../../hooks/usePopper';
import useHover from '../../../hooks/useHover';
import { createPortal } from 'react-dom';
import { times } from 'lodash';
import { unstyleList, horizontalList } from '../../../styling/list';
import useCombatantAction from '../../../hooks/useCombatantAction';
import { DamageType, damageLevelKeys } from '../../../types/Generic';
import { reduce } from 'lodash';
import CombatantSection from './Section';

const CombatantHealth: FunctionComponent = () => {
  const [referenceNode, setReferenceNode] = useState(null);
  const [popperNode, setPopperNode] = useState(null);
  const [arrowNode, setArrowNode] = useState(null);
  const combatant = useContext(CombatantContext);
  const { hovering, hoverStart, hoverEnd } = useHover(500);
  const { styles, placement, outOfBoundaries, arrowStyles } = usePopper({
    referenceNode,
    popperNode,
    arrowNode,
  });
  const dispatch = useCombatantAction();
  const totalDamage = reduce(
    combatant.data.health.damage,
    (acc, damageAmount) => acc + damageAmount,
    0
  );
  const currentWoundPenalty =
    [...damageLevelKeys].reverse().find((key, index) => {
      const previousLevels = damageLevelKeys
        .slice(0, damageLevelKeys.length - index - 1)
        .reduce(
          (acc, woundLevelKey) =>
            acc + combatant.data.health.levels[woundLevelKey],
          0
        );
      return totalDamage > previousLevels;
    }) || 0;

  return (
    <CombatantSection
      title="Wound Penalty"
      ref={setReferenceNode}
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
    >
      <Fragment>
        <span
          css={[
            textAlignCenter,
            flexCenter,
            { fontVariantNumeric: 'tabular-nums', flexGrow: 1, fontSize: 24 },
          ]}
        >
          {currentWoundPenalty !== 'I' ? '-' : null}
          {currentWoundPenalty}
        </span>
        {createPortal(
          <form
            ref={setPopperNode}
            css={[styles, !hovering && { visibility: 'hidden' }]}
            onSubmit={e => e.preventDefault()}
          >
            <fieldset css={{ background: 'white' }}>
              <legend>
                <h6 css={[noMarginPadding, allSmallCaps, textAlignCenter]}>
                  Health Levels
                </h6>
              </legend>
              <ol css={[unstyleList, horizontalList]}>
                {damageLevelKeys.map(
                  (key: 0 | 1 | 2 | 4 | 'I', woundLevelIndex, levels) => (
                    <li
                      key={`health-${key}`}
                      css={{ ':not(:last-child)': { marginRight: 4 } }}
                    >
                      <label>
                        <h6
                          css={[noMarginPadding, allSmallCaps, textAlignCenter]}
                        >
                          {key !== 'I' ? '-' : null}
                          {key}
                        </h6>
                      </label>
                      <ul css={[unstyleList, horizontalList]}>
                        {times(combatant.data.health.levels[key], i => {
                          const previousLevels = levels
                            .slice(0, woundLevelIndex)
                            .reduce(
                              (acc, woundLevelKey) =>
                                acc +
                                combatant.data.health.levels[woundLevelKey],
                              0
                            );
                          return (
                            <li
                              key={`${key}-${i}`}
                              css={{
                                marginLeft: 1,
                                marginRight: 1,
                                ':first-child': { marginLeft: 3 },
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={i + previousLevels < totalDamage}
                              />
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  )
                )}
              </ol>
              <div
                css={{
                  ul: {
                    display: 'flex',
                    li: { flexBasis: '33%', button: { width: '100%' } },
                  },
                }}
              >
                <ul css={[unstyleList, horizontalList]}>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.BASHING,
                          amount: 1,
                        })
                      }
                    >
                      +B
                    </button>
                  </li>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.LETHAL,
                          amount: 1,
                        })
                      }
                    >
                      +L
                    </button>
                  </li>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.AGGRAVATED,
                          amount: 1,
                        })
                      }
                    >
                      +A
                    </button>
                  </li>
                </ul>
                <ul css={[unstyleList, horizontalList]}>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.BASHING,
                          amount: -1,
                        })
                      }
                      disabled={combatant.data.health.damage.bashing === 0}
                    >
                      -B
                    </button>
                  </li>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.LETHAL,
                          amount: -1,
                        })
                      }
                      disabled={combatant.data.health.damage.lethal === 0}
                    >
                      -L
                    </button>
                  </li>
                  <li>
                    <button
                      role="button"
                      css={[tinyButton]}
                      onClick={() =>
                        dispatch({
                          type: 'DAMAGE',
                          damageType: DamageType.AGGRAVATED,
                          amount: -1,
                        })
                      }
                      disabled={combatant.data.health.damage.aggravated === 0}
                    >
                      -A
                    </button>
                  </li>
                </ul>
              </div>
            </fieldset>
          </form>,
          document.querySelector('body')
        )}
      </Fragment>
    </CombatantSection>
  );
};

export default CombatantHealth;
