import {
  Home,
  CreditCard,
  ScoringStep,
  DocumentStep,
  SignStep,
  CodeStep,
  NotFoundPage,
} from '@pages';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from 'react-router-dom';

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
    element: <NotFoundPage />,
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
