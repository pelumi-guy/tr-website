// hooks/useUpdateEffect.ts
import { useEffect, useRef } from 'react';

// Define the type for the effect callback
type EffectCallback = () => void | (() => void);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DependencyList = readonly any[];

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // On subsequent renders, run the effect callback
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps); // We pass the dependencies to the inner useEffect
};

export default useUpdateEffect;