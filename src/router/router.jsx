import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Meals from "../pages/meals/Meals";
import MealsDetails from "../pages/mealsDetails/MealsDetails";
import PrivateRoute from "../router/PrivateRoute";
import Order from "../pages/order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/dashboard/profile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/meals",
        Component: Meals
      },
      {
        path: "/meal/:id",
        element: <PrivateRoute><MealsDetails></MealsDetails></PrivateRoute>
      },
      {
        path: "/order/:id",
        element: <PrivateRoute><Order></Order></PrivateRoute>
      },
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: MyProfile
      }
    ]
  }

]);