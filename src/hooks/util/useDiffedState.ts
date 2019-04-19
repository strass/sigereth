import { isEqual } from 'lodash';
import { useState } from 'react';

type UpdateFn<T> = (storedValue: T) => T;

const useDiffedState: <T>(initVal: T) => [T, (value: T | UpdateFn<T>) => void] = <T>(
  initVal: T
) => {
  const [storedValue, setStoredValue] = useState<T>(initVal);

  const setValue: (value: T | UpdateFn<T>) => void = value => {
    const valueToStore: T = value instanceof Function ? value(storedValue) : value;
    setStoredValue(prevState => {
      if (isEqual(prevState, valueToStore)) {
        return prevState;
      }
      return valueToStore;
    });
  };
  return [storedValue, setValue];
};

export default useDiffedState;
