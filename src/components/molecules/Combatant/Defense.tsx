/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useState } from 'react';
import { noMarginPadding } from '../../../styling/normalize';
import { flexCenter } from '../../../styling/flex';
import { allSmallCaps, textAlignCenter } from '../../../styling/type';
import { useContext } from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import usePopper from '../../../hooks/usePopper';
import { createPortal } from 'react-dom';
import NumberSpinner from '../../atoms/NumberSpinner';
import { toNumber } from 'lodash';
import { horizontalList, unstyleList } from '../../../styling/list';
import useHover from '../../../hooks/useHover';
import Tooltip from '../../atoms/Tooltip';
import CombatantSection, { H6Label } from './Section';
import Section from './Section';
import Combatant from '../../../types/Combatant';

const CombatantDefense: FunctionComponent = () => {
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
    <CombatantSection
      title="Defense"
      ref={setReferenceNode}
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
    >
      <span
        css={[
          textAlignCenter,
          flexCenter,
          { fontVariantNumeric: 'tabular-nums', flexGrow: 1, fontSize: 24 },
        ]}
      >
        {Math.max(combatant.data.dodge, combatant.data.parry) -
          (combatant.data.ignoreOnslaught ? 0 : combatant.data.onslaught)}
      </span>
      {createPortal(
        <Tooltip
          isOpen={hovering}
          ref={setPopperNode}
          css={[styles, { minHeight: 60 }]}
        >
          <Fragment>
            <ul
              css={[
                unstyleList,
                horizontalList,
                { display: 'flex', flexGrow: 1 },
                { 'li:not(:last-child)': { marginRight: 12 } },
              ]}
            >
              <li>
                <Section title="Dodge">
                  <NumberSpinner
                    value={combatant.data.dodge}
                    onChange={e =>
                      combatant.ref.set(
                        { dodge: toNumber(e.target.value) },
                        { merge: true }
                      )
                    }
                  />
                </Section>
              </li>
              <li>
                <Section title="Parry">
                  <NumberSpinner
                    value={combatant.data.parry}
                    onChange={e =>
                      combatant.ref.set(
                        { parry: toNumber(e.target.value) },
                        { merge: true }
                      )
                    }
                  />
                </Section>
              </li>
            </ul>
            <H6Label
              css={[textAlignCenter, { marginTop: 6, flexBasis: '100%' }]}
            >
              <Fragment>
                <input
                  type="checkbox"
                  onChange={() =>
                    combatant.ref.update({
                      ignoreOnslaught: combatant.data.ignoreOnslaught
                        ? false
                        : 'TURN_END',
                    } as Combatant)
                  }
                  checked={!!combatant.data.ignoreOnslaught}
                />{' '}
                Ignore Onslaught
              </Fragment>
            </H6Label>
            {combatant.data.ignoreOnslaught && (
              <div css={{ display: 'inline-flex', flexBasis: '100%' }}>
                <label
                  css={[
                    flexCenter,
                    {
                      borderTopLeftRadius: 12,
                      borderBottomLeftRadius: 12,
                      padding: 4,
                    },
                    {
                      background:
                        combatant.data.ignoreOnslaught === 'TURN_END'
                          ? 'grey'
                          : 'lightGrey',
                    },
                  ]}
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      combatant.ref.update({ ignoreOnslaught: 'TURN_END' })
                    }
                    css={{ visibility: 'hidden', display: 'none' }}
                  />
                  End of Turn
                </label>
                <label
                  css={[
                    flexCenter,
                    {
                      borderTopRightRadius: 12,
                      borderBottomRightRadius: 12,
                      padding: 4,
                    },
                    {
                      background:
                        combatant.data.ignoreOnslaught === 'SCENELONG'
                          ? 'grey'
                          : 'lightGrey',
                    },
                  ]}
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      combatant.ref.update({ ignoreOnslaught: 'SCENELONG' })
                    }
                    css={{ visibility: 'hidden', display: 'none' }}
                  />
                  Scenelong
                </label>
              </div>
            )}
          </Fragment>
        </Tooltip>,
        document.querySelector('body')
      )}
    </CombatantSection>
  );
};

export default CombatantDefense;
