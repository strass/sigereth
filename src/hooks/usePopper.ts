// This hook is heavily insprired from https://github.com/FezVrasta/react-popper
import { useState, useEffect, useRef, CSSProperties } from 'react';
import PopperJS, { Placement, Modifiers, Data } from 'popper.js';
import useDiffedState from './util/useDiffedState';

const initialMod = {};

const usePopperState: (
  placement: Placement
) => [
  {
    styles: CSSProperties;
    placement: PopperJS.Placement;
    outOfBoundaries: boolean;
    arrowStyles: CSSProperties;
  },
  (updatedData: PopperJS.Data) => PopperJS.Data
] = placement => {
  const [currentStyles, setStyles] = useDiffedState<CSSProperties>({
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    pointerEvents: 'none',
  });
  const [currentArrowStyles, setArrowStyles] = useDiffedState<CSSProperties>(
    {}
  );
  const [currentOutOfBoundaries, setOutOfBoundaries] = useState(false);
  const [currentPlacement, setPlacement] = useState(placement);

  const updatePopperState = (updatedData: Data) => {
    const {
      styles,
      arrowStyles,
      hide,
      placement: updatedPlacement,
    } = updatedData;

    setStyles(styles as CSSProperties);
    setArrowStyles(arrowStyles as CSSProperties);
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
}: {
  referenceNode: HTMLElement;
  popperNode: HTMLElement;
  arrowNode: HTMLElement;
  placement: Placement;
  eventsEnabled: boolean;
  positionFixed: boolean;
  modifiers: Modifiers;
}) => {
  const [popperStyles, updatePopperState] = usePopperState(placement);
  const popperInstance = useRef<PopperJS | null>();

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
      popperInstance.current && popperInstance.current.destroy();
      popperInstance.current = null;
    };
  }, [
    arrowNode,
    referenceNode,
    popperNode,
    placement,
    positionFixed,
    modifiers,
    updatePopperState,
  ]);

  useEffect(() => {
    if (!popperInstance.current) return;
    if (eventsEnabled) {
      popperInstance.current.enableEventListeners();
    } else {
      popperInstance.current.disableEventListeners();
    }
  }, [eventsEnabled]);

  useEffect(() => {
    if (popperInstance.current) {
      popperInstance.current.scheduleUpdate();
    }
  });

  return popperStyles;
};
