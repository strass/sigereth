/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, FunctionComponent, useContext, ChangeEvent, useRef, RefObject } from 'react';
import { toNumber } from 'lodash';
import { CombatantContext } from '../../context/CombatantContext';
import Combatant from '../../../types/Combatant';
import { withoutNumberSpinner } from '../../../styling/input';
import useCombatantAction from '../../../hooks/useCombatantAction';
import { MoteType } from '../../../types/Generic';
import Section from './Section';

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
      <sub css={{ display: 'inline-flex', justifyContent: 'center' }}>{total}</sub>
    </span>
  );
};

const MoteDisplay: FunctionComponent = () => {
  const currentPersonalInputRef = useRef<HTMLInputElement>(null);
  const currentPeripheralInputRef = useRef<HTMLInputElement>(null);
  const combatant = useContext(CombatantContext);
  const dispatch = useCombatantAction();
  const hasMotes =
    combatant.data.motes && (combatant.data.motes.personal || combatant.data.motes.peripheral);
  return hasMotes ? (
    <Fragment>
      <Section title="Personal">
        <MoteCount
          // TODO: Deal with these in a real manner
          // @ts-ignore
          current={combatant.data.motes.personal.current}
          // @ts-ignore
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
      </Section>
      <Section title="Peripheral">
        <small>3A</small>
        <MoteCount
          // @ts-ignore
          current={combatant.data.motes.peripheral.current}
          // @ts-ignore
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
      </Section>
    </Fragment>
  ) : (
    <button
      type="button"
      onClick={() => {
        // TODO: refactor to be based on combatant config
        const motes: Combatant['motes'] = {
          personal: { current: 0, total: 0 },
          peripheral: { current: 0, total: 0 },
          hasRegainedMotesThisTurn: true,
        };
        combatant.ref.update({
          motes,
        });
      }}
    >
      Add mote display
    </button>
  );
};

export default MoteDisplay;
