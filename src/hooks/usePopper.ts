// This hook is heavily insprired from https://github.com/FezVrasta/react-popper
import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import PopperJS, { Placement } from 'popper.js';

const useDiffedState = initVal => {
  const [storedValue, setStoredValue] = useState(initVal);

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(prevState => {
      if (isEqual(prevState, valueToStore)) {
        return prevState;
      }
      return valueToStore;
    });
  };
  return [storedValue, setValue];
};

const initialMod = {};

const usePopperState: (
  placement: Placement
) => [
  {
    styles: any;
    placement: PopperJS.Placement;
    outOfBoundaries: boolean;
    arrowStyles: any;
  },
  (updatedData: any) => any
] = placement => {
  const [currentStyles, setStyles] = useDiffedState({
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
  });
  const [currentArrowStyles, setArrowStyles] = useDiffedState({});
  const [currentOutOfBoundaries, setOutOfBoundaries] = useState(false);
  const [currentPlacement, setPlacement] = useState(placement);

  const updatePopperState = updatedData => {
    const {
      styles,
      arrowStyles,
      hide,
      placement: updatedPlacement,
    } = updatedData;

    setStyles(styles);
    setArrowStyles(arrowStyles);
    setPlacement(updatedPlacement);
    setOutOfBoundaries(hide);
    return updatedData;
  };

  const popperStyles = {
    styles: currentStyles,
    placement: currentPlacement,
    outOfBoundaries: currentOutOfBoundaries,
    arrowStyles: currentArrowStyles,
  };

  return [popperStyles, updatePopperState];
};

export default ({
  referenceNode,
  popperNode,
  arrowNode,
  placement = 'bottom' as Placement,
  eventsEnabled = true,
  positionFixed = false,
  modifiers = initialMod,
}) => {
  const [popperStyles, updatePopperState] = usePopperState(placement);
  const popperInstance = useRef<PopperJS>();

  // manage the popper instance lifecycle
  useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
      popperInstance.current = null;
    }

    if (!referenceNode || !popperNode) return;

    popperInstance.current = new PopperJS(referenceNode, popperNode, {
      placement,
      positionFixed,
      modifiers: {
        ...modifiers,
        arrow: {
          ...(modifiers && modifiers.arrow),
          enabled: !!arrowNode,
          element: arrowNode,
        },
        applyStyle: { enabled: false },
        updateStateModifier: {
          enabled: true,
          order: 900,
          fn: updatePopperState,
        },
      },
    });

    // eslint-disable-next-line consistent-return
    return () => {
      popperInstance.current.destroy();
      popperInstance.current = null;
    };
  }, [
    arrowNode,
    referenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers,
  ]);

  useEffect(() => {
    if (!popperInstance.current) return;
    if (eventsEnabled) {
      popperInstance.current.enableEventListeners();
    } else {
      popperInstance.current.disableEventListeners();
    }
  }, [eventsEnabled, popperInstance.current]);

  useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.scheduleUpdate();
    }
  });

  return popperStyles;
};
