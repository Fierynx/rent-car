import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContextPool from "./pages/ContextPool";
import AppLayout from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Rent from "./pages/Rent";
import RentHistory from "./pages/RentHistory";
import AuthLayout from "./pages/AuthLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ContextPool />,
    children: [
      {
        path: '/',
        element: <AppLayout/>,
        children: [
          {
            path: '',
            element: <HomePage />,
          },
          {
            path: 'home',
            element: <HomePage />,
          },
          {
            path: 'rent/:id',
            element: <Rent/>
          },
          {
            path: 'rent-history',
            element: <RentHistory/>
          },
        ]
      },
      {
        path: 'auth',
        element: <AuthLayout/>,
        children: [
          {
            path: 'login',
            element: <Login/>
          },
          {
            path: 'register',
            element: <Register/>
          },
        ]
      }
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}