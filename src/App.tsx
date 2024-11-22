import Home from "./pages/Home/Home"
import {createBrowserRouter, Navigate, RouterProvider, RouteObject } from "react-router-dom"

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },
	{
		path: "*",
		element: <Navigate to="/" />,
	}
];

const router = createBrowserRouter(routes);

function App() {

  return (
	<RouterProvider router={router} />
  )
}

export default App
