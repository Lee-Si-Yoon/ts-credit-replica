import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GlobalPortal } from '@pages/GlobalPortal';
import { PageLayout } from '@pages/PageLayout';
import { routesConfig } from '@routes/RoutesConfig';
import reportWebVitals from './reportWebVitals';
import './_normalize.css';
import './_index.css';

const MSW = import('./mocks/browser');

MSW.then((msw) => {
  msw.worker.start({ onUnhandledRequest: 'bypass' });
});

const router = createBrowserRouter(routesConfig);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalPortal.Provider>
        <PageLayout>
          <RouterProvider router={router} />
        </PageLayout>
      </GlobalPortal.Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
