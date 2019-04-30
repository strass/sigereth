/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, Fragment, useState } from 'react';
import { useContext } from 'react';
import { createPortal } from 'react-dom';
import { toNumber } from 'lodash';
import { flexCenter } from '../../../styling/flex';
import { textAlignCenter } from '../../../styling/type';
import { CombatantContext } from '../../context/CombatantContext';
import usePopper from '../../../hooks/usePopper';
import NumberSpinner from '../../atoms/NumberSpinner';
import { horizontalList, unstyleList } from '../../../styling/list';
import useHover from '../../../hooks/useHover';
import Tooltip from '../../atoms/Tooltip';
import CombatantSection, { H6Label } from './Section';
import Section from './Section';
import TooltipContext from '../../context/TooltipContext';
import useCombatantAction from '../../../hooks/useCombatantAction';

const CombatantDefense: FunctionComponent = () => {
  const { tooltipMount } = useContext(TooltipContext);
  const [referenceNode, setReferenceNode] = useState<HTMLElement | null>(null);
  const [popperNode, setPopperNode] = useState<HTMLElement | null>(null);
  const { hovering, hoverStart, hoverEnd } = useHover(500);
  const combatant = useContext(CombatantContext);
  const { styles } = usePopper({
    referenceNode: referenceNode || undefined,
    popperNode: popperNode || undefined,
  });
  const dispatch = useCombatantAction();

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
        <Tooltip isOpen={hovering} ref={setPopperNode} css={[styles, { minHeight: 60 }]}>
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
                      dispatch({ type: 'SET_DEFENSE_DODGE', dodge: toNumber(e.target.value) })
                    }
                  />
                </Section>
              </li>
              <li>
                <Section title="Parry">
                  <NumberSpinner
                    value={combatant.data.parry}
                    onChange={e =>
                      dispatch({ type: 'SET_DEFENSE_PARRY', parry: toNumber(e.target.value) })
                    }
                  />
                </Section>
              </li>
            </ul>
            <H6Label css={[textAlignCenter, { marginTop: 6, flexBasis: '100%' }]}>
              <Fragment>
                <input
                  type="checkbox"
                  onChange={() =>
                    dispatch({
                      type: 'SET_IGNORE_ONSLAUGHT',
                      ignoreOnslaught: combatant.data.ignoreOnslaught ? false : 'TURN_END',
                    })
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
                        combatant.data.ignoreOnslaught === 'TURN_END' ? 'grey' : 'lightGrey',
                    },
                  ]}
                  htmlFor={`combatant-${combatant.id}-onslaught-ignore-toggle-turnlong`}
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      dispatch({ type: 'SET_IGNORE_ONSLAUGHT', ignoreOnslaught: 'TURN_END' })
                    }
                    css={{ visibility: 'hidden', display: 'none' }}
                    id={`combatant-${combatant.id}-onslaught-ignore-toggle-turnlong`}
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
                        combatant.data.ignoreOnslaught === 'SCENELONG' ? 'grey' : 'lightGrey',
                    },
                  ]}
                  htmlFor={`combatant-${combatant.id}-onslaught-ignore-toggle-scenelong`}
                >
                  <input
                    type="checkbox"
                    onChange={() =>
                      dispatch({ type: 'SET_IGNORE_ONSLAUGHT', ignoreOnslaught: 'SCENELONG' })
                    }
                    css={{ visibility: 'hidden', display: 'none' }}
                    id={`combatant-${combatant.id}-onslaught-ignore-toggle-scenelong`}
                  />
                  Scenelong
                </label>
              </div>
            )}
          </Fragment>
        </Tooltip>,
        tooltipMount as HTMLElement
      )}
    </CombatantSection>
  );
};

export default CombatantDefense;
