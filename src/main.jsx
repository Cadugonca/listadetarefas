import React from 'react';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.scss';
import Inicial from "./paths/inicial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inicial />,
  },
])



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>)

export default main