import Home from "./pages/Home/Home"
import {createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom"
import { CreditCard } from "@pages/CreditCard/CreditCard";
import { NotFound } from "@pages/NotFound/NotFound";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
	{
		path: "/credit-card",
		element: <CreditCard />,
	},
	{
		path: "*",
		element: <NotFound />,
	}
];

const router = createBrowserRouter(routes, {
	future: {
	  v7_relativeSplatPath: true,
	  v7_fetcherPersist: true,
	  v7_normalizeFormMethod: true,
	  v7_partialHydration: true,
	  v7_skipActionErrorRevalidation:true
	},
  });;

function App() {

  return (
	<RouterProvider future={{
		v7_startTransition: true,
	  }} router={router} />
  )
}

export default App
