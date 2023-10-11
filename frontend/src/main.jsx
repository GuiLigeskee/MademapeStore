import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./store.jsx";

// React-router
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

// Paginas
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/EditProfile/EditProfile.jsx";
import EditPage from "./pages/EditPage/EditPage.jsx";
import CreateButton from "./pages/CreateButton/CreateButton.jsx";
import UserPage from "./pages/UserPage/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/userpage",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit-page",
        element: <EditPage />,
      },
      {
        path: "/create-button",
        element: <CreateButton />,
      },
      {
        path: "/user-page/:id",
        element: <UserPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
