/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, CSSProperties } from 'react';
import { Rnd, Props as RndProps } from 'react-rnd';
import NewWindow, { INewWindowProps } from 'react-new-window';

const DraggableWindow: FunctionComponent<{
  closePortal: () => void;
  windowPopOut: () => void;
  windowShrink: () => void;
  isWindow: boolean;
}> = ({
  children,
  closePortal,
  isWindow,
  windowPopOut,
  windowShrink,
  ...props
}) => {
  const El = isWindow ? NewWindow : Rnd;
  const elP = isWindow
    ? ({ copyStyles: true, onUnload: closePortal } as INewWindowProps)
    : ({
        style: { pointerEvents: 'auto' } as CSSProperties,
        default: {
          x: 0,
          y: 0,
          width: 500,
          height: 768,
        },
        bounds: 'window',
        dragHandleClassName: 'handle',
      } as RndProps);
  return (
    <El {...elP}>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: 'inherit',
          height: 'inherit',
          background: 'white',
          border: '1px solid grey',
        }}
        {...props}
      >
        <nav
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderBottom: '1px solid black',
            cursor: 'move',
          }}
          className="handle"
        >
          <button onClick={isWindow ? windowShrink : windowPopOut}>
            {isWindow ? 'v' : '^'}
          </button>
          ><button onClick={closePortal}>x</button>
        </nav>
        <main
          css={{
            overflowY: 'auto',
            flexGrow: 1,
            padding: 6,
          }}
        >
          {children}
        </main>
      </div>
    </El>
  );
};

export default DraggableWindow;
