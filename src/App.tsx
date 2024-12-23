import Home from '@pages/Home/Home';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';
import { CreditCard } from '@pages/CreditCard/CreditCard';
import { NotFound } from '@pages/NotFound/NotFound';
import { ScoringStep } from '@pages/ScoringStep/ScoringStep';
import { DocumentStep } from '@pages/DocumentStep/DocumentStep';
import { SignStep } from '@pages/SignStep/SignStep';
import { CodeStep } from '@pages/CodeStep/CodeStep';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/loan',
    element: <CreditCard />,
  },
  {
    path: '/loan/:id',
    element: <ScoringStep />,
  },
  {
    path: '/loan/:id/document',
    element: <DocumentStep />,
  },
  {
    path: '/loan/:id/document/sign',
    element: <SignStep />,
  },
  {
    path: '/loan/:id/code',
    element: <CodeStep />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

function App() {
  return (
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
      router={router}
    />
  );
}

export default App;
