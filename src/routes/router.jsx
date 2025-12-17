import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Meals from "../pages/meals/Meals";
import MealsDetails from "../pages/mealsDetails/MealsDetails";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/order/Order";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProfile from "../pages/dashboard/profile/MyProfile";
import MyReview from "../pages/dashboard/myReview/MyReview";
import MyFavorite from "../pages/dashboard/myFavorite/MyFavorite";
import MyOrder from "../pages/dashboard/myOrder/MyOrder";
import PaymentSuccess from "../pages/dashboard/myOrder/PaymentSuccess";
import CreateMeal from "../pages/dashboard/createMeal/CreateMeal";
import MyMeals from "../pages/dashboard/myMeals/MyMeals";
import OrderRequests from "../pages/dashboard/orderRequests/OrderRequests";
import ManageUsers from "../pages/dashboard/manageUsers/ManageUsers";
import PlatformStatistics from "../pages/dashboard/platformStatistics/PlatformStatistics";
import ManageRequest from "../pages/dashboard/manageRequest/ManageRequest";
import Error from "../components/shared/Error";
import AdminRoute from "./AdminRoute";
import ChefRoute from "./ChefRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "meals",
        Component: Meals
      },
      {
        path: "meal/:id",
        element: <PrivateRoute><MealsDetails></MealsDetails></PrivateRoute>
      },
      {
        path: "order/:id",
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
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
      },
      {
        path: "my-review",
        element: <PrivateRoute><MyReview></MyReview></PrivateRoute>
      },
      {
        path: "my-favorite",
        element: <PrivateRoute><MyFavorite></MyFavorite></PrivateRoute>
      },
      {
        path: "my-order",
        element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "create-meal",
        element: <ChefRoute><CreateMeal></CreateMeal></ChefRoute>
      },
      {
        path: "my-meals",
        element: <ChefRoute> <MyMeals></MyMeals></ChefRoute>
      },
      {
        path: "order-requests",
        element: <ChefRoute><OrderRequests></OrderRequests></ChefRoute>
      },
      {
        path: "manage-user",
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: "manage-request",
        element: <AdminRoute><ManageRequest></ManageRequest></AdminRoute>
      },
      {
        path: "platform-statistics",
        element: <AdminRoute><PlatformStatistics></PlatformStatistics></AdminRoute>
      },
    ]
  }

]);