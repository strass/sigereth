/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  ReactNode,
  useContext,
  forwardRef,
  RefForwardingComponent,
  HTMLAttributes,
  MouseEvent,
} from 'react';
import { CombatantContext } from '../../context/CombatantContext';
import { textAlignCenter } from '../../../styling/type';
import H from '../../atoms/Type/Header';
import { flexCenter } from '../../../styling/flex';

export const H6Label = H.H6.withComponent('label');

const CombatantSection: RefForwardingComponent<
  HTMLElement,
  {
    title: string;
    labelMarginBottom?: number;
    children: ReactNode;
    onLabelClick?: (e: MouseEvent<HTMLLabelElement>) => void;
    labelTitle?: string;
  } & HTMLAttributes<HTMLElement>
> = (
  {
    title,
    labelTitle,
    labelMarginBottom = 4,
    children,
    onLabelClick,
    ...props
  },
  ref
) => {
  const combatant = useContext(CombatantContext);

  return (
    <section
      css={[{ display: 'flex', flexDirection: 'column' }]}
      {...props}
      ref={ref}
    >
      <H6Label
        css={[
          textAlignCenter,
          { width: '100%', display: 'block', marginBottom: labelMarginBottom },
          { userSelect: 'none' },
          onLabelClick && {
            borderBottom: '1px solid lightgrey',
            cursor: 'pointer',
            ':hover': {
              borderBottomColor: 'grey',
            },
          },
        ]}
        onDoubleClick={e => {
          onLabelClick(e);
          e.target.control.blur();
        }}
        htmlFor={`combatant-${combatant.id}-${title}`}
        title={labelTitle}
      >
        {title}
      </H6Label>
      <div css={[flexCenter, { flexGrow: 1 }]}>{children}</div>
    </section>
  );
};

export default forwardRef(CombatantSection);
