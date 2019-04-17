/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, {
  Fragment,
  FunctionComponent,
  useContext,
  ChangeEvent,
  useRef,
  RefObject,
} from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import { toNumber } from 'lodash';
import Combatant from '../../../types/Combatant';
import { withoutNumberSpinner } from '../../../styling/input';
import useCombatantAction from '../../../hooks/useCombatantAction';
import { MoteType } from '../../../types/Generic';
import { noMarginPadding } from '../../../styling/normalize';
import { allSmallCaps, textAlignCenter } from '../../../styling/type';
import { flexCenter } from '../../../styling/flex';
import H from '../../atoms/Type/Header';

const MoteCount: FunctionComponent<{
  current: number;
  total: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
}> = ({ current, total, onChange, inputRef }) => {
  return (
    <span css={{ fontVariantNumeric: 'tabular-numbers' }}>
      <sup
        css={{
          display: 'inline-flex',
          width: '4.2ex',
          fontVariantNumeric: 'tabular-nums',
          justifyContent: 'flex-end',
        }}
      >
        <input
          value={current}
          type="number"
          css={[
            withoutNumberSpinner,
            {
              width: '100%',
              background: 'none',
              border: 'none',
              textAlign: 'right',
            },
          ]}
          onChange={onChange}
          ref={inputRef}
        />
      </sup>
      {'/'}
      <sub css={{ display: 'inline-flex', justifyContent: 'center' }}>
        {total}
      </sub>
    </span>
  );
};

const MoteDisplay: FunctionComponent = () => {
  const currentPersonalInputRef = useRef<HTMLInputElement>(null);
  const currentPeripheralInputRef = useRef<HTMLInputElement>(null);
  const combatant = useContext(CombatantContext);
  const dispatch = useCombatantAction();
  return combatant.data.motes.personal || combatant.data.motes.peripheral ? (
    <Fragment>
      <figure css={{ display: 'flex', flexDirection: 'column' }}>
        <legend>
          <H.H6 css={[noMarginPadding, allSmallCaps, textAlignCenter]}>
            Personal
          </H.H6>
        </legend>
        <div css={[flexCenter, { flexGrow: 1 }]}>
          <MoteCount
            current={combatant.data.motes.personal.current}
            total={combatant.data.motes.personal.total}
            inputRef={currentPersonalInputRef}
            onChange={e =>
              dispatch({
                type: 'SET_MOTES',
                moteType: MoteType.PERSONAL,
                current: toNumber(e.target.value),
              })
            }
          />
        </div>
      </figure>
      <figure css={{ display: 'flex', flexDirection: 'column' }}>
        <legend>
          <H.H6 css={[noMarginPadding, allSmallCaps, textAlignCenter]}>
            Peripheral
          </H.H6>
        </legend>
        <div css={[flexCenter, { flexGrow: 1 }]}>
          3A{' '}
          <MoteCount
            current={combatant.data.motes.peripheral.current}
            total={combatant.data.motes.peripheral.total}
            inputRef={currentPeripheralInputRef}
            onChange={e =>
              dispatch({
                type: 'SET_MOTES',
                moteType: MoteType.PERIPHERAL,
                current: toNumber(e.target.value),
              })
            }
          />
        </div>
      </figure>
    </Fragment>
  ) : (
    // <ul css={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
    //   {combatant.data.motes.personal && (
    //     <li
    //       css={{
    //         background: 'red',
    //         borderRadius: 12,
    //         padding: '2px 8px',
    //         marginRight: 12,
    //       }}
    //       onWheel={e => {
    //         e.preventDefault();
    //         dispatch({
    //           type: 'SET_MOTES',
    //           moteType: MoteType.PERSONAL,
    //           current:
    //             combatant.data.motes.personal.current + (e.deltaY > 0 ? -1 : 1),
    //         });
    //       }}
    //       onClick={() => {
    //         currentPersonalInputRef.current &&
    //           currentPersonalInputRef.current.focus();
    //       }}
    //       onDoubleClick={() => {
    //         currentPersonalInputRef.current &&
    //           currentPersonalInputRef.current.blur();
    //         const total = toNumber(window.prompt('enter total motes'));
    //         dispatch({
    //           type: 'SET_MOTES',
    //           moteType: MoteType.PERSONAL,
    //           total,
    //         });
    //       }}
    //     >
    //       Personal:{' '}
    //       <MoteCount
    //         current={combatant.data.motes.personal.current}
    //         total={combatant.data.motes.personal.total}
    //         inputRef={currentPersonalInputRef}
    //         onChange={e =>
    //           dispatch({
    //             type: 'SET_MOTES',
    //             moteType: MoteType.PERSONAL,
    //             current: toNumber(e.target.value),
    //           })
    //         }
    //       />
    //     </li>
    //   )}
    //   {combatant.data.motes.peripheral && (
    //     <li
    //       css={{ background: 'red', borderRadius: 12, padding: '2px 8px' }}
    //       onWheel={e => {
    //         e.preventDefault();
    //         dispatch({
    //           type: 'SET_MOTES',
    //           moteType: MoteType.PERIPHERAL,
    //           current:
    //             combatant.data.motes.peripheral.current +
    //             (e.deltaY > 0 ? -1 : 1),
    //         });
    //       }}
    //       onClick={() => {
    //         currentPeripheralInputRef.current &&
    //           currentPeripheralInputRef.current.focus();
    //       }}
    //       onDoubleClick={() => {
    //         currentPeripheralInputRef.current &&
    //           currentPeripheralInputRef.current.blur();
    //         const total = toNumber(window.prompt('enter total motes'));
    //         dispatch({
    //           type: 'SET_MOTES',
    //           moteType: MoteType.PERIPHERAL,
    //           total,
    //         });
    //       }}
    //     >
    //       Peripheral:{' '}
    //       <MoteCount
    //         current={combatant.data.motes.peripheral.current}
    //         total={combatant.data.motes.peripheral.total}
    //         inputRef={currentPeripheralInputRef}
    //         onChange={e =>
    //           dispatch({
    //             type: 'SET_MOTES',
    //             moteType: MoteType.PERIPHERAL,
    //             current: toNumber(e.target.value),
    //           })
    //         }
    //       />
    //     </li>
    //   )}
    // </ul>
    <button
      type="button"
      onClick={() =>
        combatant.ref.update({
          motes: {
            personal: { current: 0, total: 0 },
            peripheral: { current: 0, total: 0 },
            hasRegainedMotesThisTurn: true,
          },
        } as Combatant)
      }
    >
      Add mote display
    </button>
  );
};

export default MoteDisplay;
