import type { ReactNode } from 'react';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';

const PortalContext = createContext<HTMLDivElement | null>(null);

interface PortalProviderProps {
  children: ReactNode;
}

function PortalProvider({ children }: PortalProviderProps) {
  const [portalContainerRef, setPortalContainerRef] =
    useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainerRef}>
      {children}
      <div
        id="portal-container"
        ref={(element) => {
          if (portalContainerRef !== null || element === null) {
            return;
          }

          setPortalContainerRef(element);
        }}
      />
    </PortalContext.Provider>
  );
}

interface PortalConsumerProps {
  children: ReactNode;
}

function PortalConsumer({ children }: PortalConsumerProps) {
  return (
    <PortalContext.Consumer>
      {(portalContainerRef) => {
        if (portalContainerRef === null) {
          return null;
        }

        return createPortal(children, portalContainerRef);
      }}
    </PortalContext.Consumer>
  );
}

export const GlobalPortal = {
  Provider: PortalProvider,
  Consumer: PortalConsumer,
};
