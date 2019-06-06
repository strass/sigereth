import { useRef, useCallback } from 'react';

const useContextRef = <T = any>(context: React.Context<T>): (() => T) => {
  const contextRef = useRef(context);
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  return useCallback(() => contextRef.current._currentValue, []);
};

export default useContextRef;
