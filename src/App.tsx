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

const router = createBrowserRouter(routes);

function App() {

  return (
	<RouterProvider router={router} />
  )
}

export default App
