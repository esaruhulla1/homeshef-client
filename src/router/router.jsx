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
      },
      {
        path: "/dashboard/my-review",
        element: <MyReview></MyReview>
      },
      {
        path: "/dashboard/my-favorite",
        element: <MyFavorite></MyFavorite>
      },
      {
        path: "/dashboard/my-order",
        element: <MyOrder></MyOrder>
      },
      {
        path: "/dashboard/payment-success",
        element: <PaymentSuccess></PaymentSuccess>
      },
      {
        path: "/dashboard/create-meal",
        element: <CreateMeal></CreateMeal>
      },
      {
        path: "/dashboard/my-meals",
        element: <MyMeals></MyMeals>
      },
      {
        path: "/dashboard/order-requests",
        element: <OrderRequests></OrderRequests>
      },
      {
        path: "/dashboard/manage-user",
        element: <ManageUsers></ManageUsers>
      },
      {
        path: "/dashboard/manage-request",
        element: <ManageRequest></ManageRequest>
      },
      {
        path: "/dashboard/platform-statistics",
        element: <PlatformStatistics></PlatformStatistics>
      },
    ]
  }

]);