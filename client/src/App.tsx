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
            path: 'login',
            element: <Login/>
          },
          {
            path: 'register',
            element: <Register/>
          },
          {
            path: 'rent/:car_id',
            element: <Rent/>
          },
          {
            path: 'rent-history',
            element: <RentHistory/>
          },
        ]
      }
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}