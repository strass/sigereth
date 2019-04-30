/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
  createContext,
  FunctionComponent,
  useCallback,
  useReducer,
  useMemo,
  useState,
} from 'react';
import { uniqueId, forEach, reject, noop } from 'lodash';

const TooltipContext = createContext<{
  tooltipMount: HTMLElement | null;
  subscribeTooltip: (
    hideTooltip: () => void
  ) => {
    unsubscribe: () => void;
    onOpen: () => void;
  };
}>({
  tooltipMount: null,
  subscribeTooltip: () => {
    console.error('!!! TooltipContextProvider not mounted !!!');
    return {
      unsubscribe: noop,
      onOpen: noop,
    };
  },
});

export const TooltipContextProvider: FunctionComponent = ({ children }) => {
  const [, dispatch] = useReducer(
    (
      state: Record<string, () => void>,
      action: { type: string } & (
        | {
            type: 'SUBSCRIBE_TOOLTIP';
            id: string;
            hideTooltip: () => void;
          }
        | { type: 'ON_OPEN'; id: string }
        | { type: 'UNSUBSCRIBE_TOOLTIP'; id: string })
    ) => {
      switch (action.type) {
        case 'SUBSCRIBE_TOOLTIP':
          return { ...state, [action.id]: action.hideTooltip() };
        case 'ON_OPEN':
          forEach(state, (hide, id) => {
            if (id !== action.id) {
              hide();
            }
          });
          return state;
        case 'UNSUBSCRIBE_TOOLTIP':
          return reject(state, (_t, id) => id === action.id);
        default:
          return state;
      }
    },
    // TODO: try to remove this?
    ({} as unknown) as never
  );
  const [tooltipMountRef, setTooltipMountRef] = useState<HTMLElement | null>(null);

  const subscribeTooltip = useCallback((hideTooltip: () => void) => {
    const id = uniqueId('tooltip_');
    dispatch({ type: 'SUBSCRIBE_TOOLTIP', id, hideTooltip });
    return {
      unsubscribe: () => dispatch({ type: 'UNSUBSCRIBE_TOOLTIP', id }),
      onOpen: () => dispatch({ type: 'ON_OPEN', id }),
    };
  }, []);

  const value = useMemo(
    () => ({
      tooltipMount: tooltipMountRef,
      subscribeTooltip,
    }),
    [subscribeTooltip, tooltipMountRef]
  );

  return (
    <TooltipContext.Provider value={value}>
      {children}
      <aside ref={setTooltipMountRef} />
    </TooltipContext.Provider>
  );
};

export default TooltipContext;
