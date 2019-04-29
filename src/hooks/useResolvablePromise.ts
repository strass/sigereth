import { useRef } from 'react';

const useResolvablePromise = (): [Promise<any>, () => void] => {
  const resolve = useRef<() => void | null>(null);
  const promise = useRef(
    new Promise(res => {
      resolve.current = res;
    })
  );
  return [promise.current, resolve.current as () => void];
};

export default useResolvablePromise;
