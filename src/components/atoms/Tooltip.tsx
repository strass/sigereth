/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  ReactNode,
  forwardRef,
  RefForwardingComponent,
  HTMLAttributes,
} from 'react';

const Tooltip: RefForwardingComponent<
  HTMLElement,
  { children: ReactNode; isOpen: boolean } & HTMLAttributes<HTMLElement>
> = ({ children, isOpen, ...props }, ref) => {
  return isOpen ? (
    <aside
      css={[
        !isOpen && { visibility: 'hidden' },
        { display: 'flex', flexDirection: 'column' },
        { padding: 6 },
        { background: 'white', border: '1px solid grey' },
      ]}
      {...props}
      ref={ref}
    >
      {children}
    </aside>
  ) : null;
};

export default forwardRef(Tooltip);
