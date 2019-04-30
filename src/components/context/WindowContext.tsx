/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  createContext,
  FunctionComponent,
  useReducer,
  useMemo,
  Dispatch,
  ReducerAction,
  useState,
  useCallback,
} from 'react';
import { firestore } from 'firebase';
import { reject, map } from 'lodash';
import DraggableWindow from '../atoms/DraggableWindow';
import WindowContent from '../organisms/WindowContent';

const WindowContext = createContext<WindowContextState>({
  windows: [],
  dispatch: () => {},
  windowMount: null,
});

interface DraggableWindow {
  ref: firestore.DocumentReference;
  open: boolean;
}

type WindowReducerState = DraggableWindow[];

interface WindowContextState {
  windows: WindowReducerState;
  dispatch: Dispatch<ReducerAction<typeof windowReducer>>;
  windowMount: HTMLElement | null;
}

type WindowReducerAction = { type: string } & (
  | {
      type: 'ADD_WINDOW';
      ref: firestore.DocumentReference;
    }
  | {
      type: 'REMOVE_WINDOW';
      path: firestore.DocumentReference['path'];
    }
  | {
      type: 'POP_OUT';
      path: firestore.DocumentReference['path'];
    }
  | {
      type: 'SHRINK';
      path: firestore.DocumentReference['path'];
    });

const windowReducer = (state: WindowReducerState, action: WindowReducerAction) => {
  switch (action.type) {
    case 'ADD_WINDOW':
      const pathAlreadyOpen = !!state.find(dw => dw.ref.path === action.ref.path);
      return pathAlreadyOpen
        ? state
        : [...state, { ref: action.ref, open: false } as DraggableWindow];
    case 'REMOVE_WINDOW':
      return reject(state, dw => action.path === dw.ref.path);
    case 'POP_OUT':
      return map(state, dw => (action.path === dw.ref.path ? { ...dw, open: true } : dw));
    case 'SHRINK':
      return map(state, dw => (action.path === dw.ref.path ? { ...dw, open: false } : dw));
    default:
      return state;
  }
};

export const WindowContextProvider: FunctionComponent = ({ children }) => {
  const [windowMount, setWindowMount] = useState<HTMLElement | null>(null);
  const [windows, dispatch] = useReducer(windowReducer, []);
  const value = useMemo(() => ({ windows, dispatch, windowMount }), [
    windows,
    dispatch,
    windowMount,
  ]);
  const closePortal = useCallback(path => {
    console.log(`Removing Window ${path}`);
    dispatch({ type: 'REMOVE_WINDOW', path });
  }, []);
  const windowPopOut = useCallback(path => {
    console.log(`Opening Window ${path}`);
    dispatch({ type: 'POP_OUT', path });
  }, []);
  const windowShrink = useCallback(path => {
    console.log(`Shrinking Window ${path}`);
    dispatch({ type: 'SHRINK', path });
  }, []);
  return (
    <WindowContext.Provider value={value}>
      {children}
      <aside
        css={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          pointerEvents: 'none',
        }}
        ref={setWindowMount}
      >
        {windows.map(({ ref, open }) => (
          <DraggableWindow
            key={ref.path}
            closePortal={() => closePortal(ref.path)}
            windowPopOut={() => windowPopOut(ref.path)}
            windowShrink={() => windowShrink(ref.path)}
            css={{ pointerEvents: 'auto' }}
            isWindow={open}
          >
            <WindowContent firestoreRef={ref} />
          </DraggableWindow>
        ))}
      </aside>
      {/* {windows.map(({ ref }) =>
        createPortal(
          <DraggableWindow closePortal={() => closePortal(ref.path)}>
            <WindowContent firestoreRef={ref} />
          </DraggableWindow>,
          windowMount
        )
      )} */}
    </WindowContext.Provider>
  );
};

export default WindowContext;
