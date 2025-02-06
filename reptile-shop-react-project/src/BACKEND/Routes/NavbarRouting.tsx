import * as ReactDOM from 'react-dom/client';  // Correct import syntax
import { RouteObject } from 'react-router-dom';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from '../../FRONTEND/Pages/Home';
import React from 'react'
import CreateAccount from '../../FRONTEND/Pages/CreateAccount';

//import { Link } from 'react-router-dom';
const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>
    },
    {
      path: "/CreateAccount",
      element: <CreateAccount/>
    },

];

const router = createBrowserRouter(routes);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
  );
} else {
  console.error('Root element not found.');
}
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);