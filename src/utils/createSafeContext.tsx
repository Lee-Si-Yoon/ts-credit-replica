import React from 'react';

export function createSafeContext<T>(errorMessage: string) {
  const Context = React.createContext<T | null>(null);

  function useSafeContext() {
    const ctx = React.useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return ctx;
  }

  function Provider({
    contextValue,
    children,
  }: {
    contextValue: T;
    children: React.ReactNode;
  }) {
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
  }

  return [Provider, useSafeContext] as const;
}
