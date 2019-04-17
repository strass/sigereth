/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useState } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import DotScale from '../../atoms/DotScale';
import Combatant from '../../../types/Combatant';
import { clamp } from 'lodash';
import { unstyleList } from '../../../styling/list';
import TooltipContext from '../../context/TooltipContext';
import usePopper from '../../../hooks/usePopper';
import useHover from '../../../hooks/useHover';
import { noMarginPadding } from '../../../styling/normalize';
import { allSmallCaps, textAlignCenter } from '../../../styling/type';
import { flexCenter } from '../../../styling/flex';
import { createPortal } from 'react-dom';
import H from '../../atoms/Type/Header';

const Willpower = () => {
  const { tooltipMount } = useContext(TooltipContext);
  const [referenceNode, setReferenceNode] = useState(null);
  const [popperNode, setPopperNode] = useState(null);
  const [arrowNode, setArrowNode] = useState(null);
  const { hovering, hoverStart, hoverEnd } = useHover(500);
  const combatant = useContext(CombatantContext);
  const { styles, placement, outOfBoundaries, arrowStyles } = usePopper({
    referenceNode,
    popperNode,
    arrowNode,
  });

  return (
    <figure
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
      ref={setReferenceNode}
    >
      <legend>
        <H.H6 css={[noMarginPadding, allSmallCaps, textAlignCenter]}>
          Willpower
        </H.H6>
      </legend>
      <span
        css={[
          textAlignCenter,
          flexCenter,
          { fontVariantNumeric: 'tabular-nums', flexGrow: 1, fontSize: 24 },
        ]}
      >
        {combatant.data.willpower.temporary}
      </span>
      {createPortal(
        <form
          ref={setPopperNode}
          css={[styles, !hovering && { visibility: 'hidden' }]}
        >
          <fieldset css={{ background: 'white' }}>
            <legend>
              <H.H6 css={[noMarginPadding, allSmallCaps, textAlignCenter]}>
                Willpower
              </H.H6>
            </legend>

            <div
              css={{ display: 'inline-flex', margin: 0, padding: 0 }}
              onWheel={e => {
                e.preventDefault();
                combatant.ref.set(
                  {
                    willpower: {
                      temporary: clamp(
                        combatant.data.willpower.temporary +
                          (e.deltaY > 0 ? -1 : 1),
                        0,
                        10
                      ),
                    },
                  },
                  { merge: true }
                );
              }}
            >
              <ul css={unstyleList}>
                <li
                  onWheel={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    combatant.ref.set(
                      {
                        willpower: {
                          permanent: clamp(
                            combatant.data.willpower.permanent +
                              (e.deltaY > 0 ? -1 : 1),
                            0,
                            10
                          ),
                        },
                      },
                      { merge: true }
                    );
                  }}
                >
                  <DotScale
                    current={
                      combatant.data.willpower
                        ? combatant.data.willpower.permanent
                        : 0
                    }
                    total={10}
                    onChangeRating={permanent =>
                      combatant.ref.set(
                        { willpower: { permanent } } as Combatant,
                        {
                          merge: true,
                        }
                      )
                    }
                    type="circle"
                  />
                </li>
                <li>
                  <DotScale
                    current={
                      combatant.data.willpower
                        ? combatant.data.willpower.temporary
                        : 0
                    }
                    total={10}
                    onChangeRating={temporary =>
                      combatant.ref.set(
                        { willpower: { temporary } } as Combatant,
                        {
                          merge: true,
                        }
                      )
                    }
                    type="square"
                  />
                </li>
              </ul>
            </div>
          </fieldset>
        </form>,
        tooltipMount
      )}
    </figure>
  );
};

export default Willpower;
