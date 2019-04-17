import { useState, useCallback, useRef, useContext, useEffect } from 'react';
import TooltipContext from '../components/context/TooltipContext';

const useHover = (timeout = 0) => {
  const { subscribeTooltip } = useContext(TooltipContext);
  const timer = useRef<ReturnType<typeof window.setTimeout>>(null);
  const [hovering, setHovering] = useState(false);
  const [onOpen, setOnOpen] = useState(() => () => {});
  const hoverStart = useCallback(() => {
    onOpen();
    window.clearTimeout(timer.current || undefined);
    setHovering(true);
  }, [setHovering, onOpen]);
  const hoverEnd = useCallback(() => {
    // @ts-ignore says it's read only
    timer.current = window.setTimeout(() => setHovering(false), timeout);
  }, [setHovering, timeout]);

  useEffect(() => {
    const { unsubscribe, onOpen: onOpenFn } = subscribeTooltip(() => () =>
      setHovering(false)
    );
    setOnOpen(() => onOpenFn);
    return unsubscribe;
  }, [subscribeTooltip]);

  return { hovering, hoverStart, hoverEnd };
};

export default useHover;
