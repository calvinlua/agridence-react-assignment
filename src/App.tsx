import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/main/NotesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <div>Not Found</div>,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
    ],
  },
  {
    path: "/main",
    element: <NotesPage />,
    errorElement: <div>Not Found</div>,
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
