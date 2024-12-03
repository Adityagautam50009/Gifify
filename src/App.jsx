import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Category from "./pages/Category";
import Search from "./pages/Search";
import GifPage from "./pages/GifPage";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import GifProvider from "./context/gif-context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:query",
        element: <Search />,
      },
      {
        path: "/:category",
        element: <Category />,
      },
      {
        path: "/:type/:slug",
        element: <GifPage />,
      },
      {
        path: "/favourite",
        element: <Favourite />,
      },
    ],
  },
]);

const App = () => {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
};

export default App;
