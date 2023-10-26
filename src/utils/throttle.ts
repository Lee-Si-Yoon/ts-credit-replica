/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

export function useThrottleTime<T extends any[]>(
  callback: (...params: T) => void,
  time: number
) {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...params: T) => {
    if (!timer.current) {
      callback(...params);
      timer.current = setTimeout(() => {
        timer.current = null;
      }, time);
    }
  };
}
