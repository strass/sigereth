import { useRef } from 'react';

const useResolvablePromise = (): [Promise<any>, () => void] => {
  let { current: resolve } = useRef<() => void | null>(null);
  const promise = useRef(
    new Promise(res => {
      resolve = res;
    })
  );
  return [promise.current, resolve as () => void];
};

export default useResolvablePromise;
