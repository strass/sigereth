/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useState } from 'react';
import { clamp } from 'lodash';
import { createPortal } from 'react-dom';
import { CombatantContext } from '../../context/CombatantContext';
import DotScale from '../../atoms/DotScale';
import Combatant from '../../../types/Combatant';
import { unstyleList } from '../../../styling/list';
import TooltipContext from '../../context/TooltipContext';
import usePopper from '../../../hooks/usePopper';
import useHover from '../../../hooks/useHover';
import { noMarginPadding } from '../../../styling/normalize';
import { allSmallCaps, textAlignCenter } from '../../../styling/type';
import { flexCenter } from '../../../styling/flex';
import H from '../../atoms/Type/Header';
import Tooltip from '../../atoms/Tooltip';
import Section from './Section';
import usePermissions from '../../../hooks/usePermissions';
import useCombatantAction from '../../../hooks/useCombatantAction';

const Willpower = () => {
  const { tooltipMount } = useContext(TooltipContext);
  const [referenceNode, setReferenceNode] = useState(null);
  const [popperNode, setPopperNode] = useState(null);
  // const [arrowNode, setArrowNode] = useState(null);
  const { hovering, hoverStart, hoverEnd } = useHover(500);
  const combatant = useContext(CombatantContext);
  const { isResourceOwnerOrGameOwner } = usePermissions(combatant);
  const { styles } = usePopper({
    referenceNode: referenceNode || undefined,
    popperNode: popperNode || undefined,
    // arrowNode,
  });
  const dispatch = useCombatantAction();

  return (
    <Section
      title="Willpower"
      onMouseEnter={hoverStart}
      onMouseLeave={hoverEnd}
      ref={setReferenceNode}
    >
      <span
        css={[
          textAlignCenter,
          flexCenter,
          { fontVariantNumeric: 'tabular-nums', flexGrow: 1, fontSize: 24 },
        ]}
      >
        {combatant.data.willpower.temporary}
      </span>
      {isResourceOwnerOrGameOwner &&
        createPortal(
          <Tooltip ref={setPopperNode} css={[styles, { flexDirection: 'row' }]} isOpen={hovering}>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: 'SET_WILLPOWER',
                  willpower: combatant.data.willpower.temporary + 1,
                })
              }
              disabled={combatant.data.willpower.temporary >= 10}
            >
              +1
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch({
                  type: 'SET_WILLPOWER',
                  willpower: combatant.data.willpower.temporary - 1,
                })
              }
              disabled={combatant.data.willpower.temporary < 1}
            >
              -1
            </button>
          </Tooltip>,
          tooltipMount as Element
        )}
    </Section>
  );
};

export default Willpower;
