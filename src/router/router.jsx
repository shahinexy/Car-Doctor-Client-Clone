import PrivetRoute from "../PeivetRoute/PrivetRoute";
import Booking from "../pages/Booking/Booking";
import CheckOut from "../pages/CheckOut/CheckOut";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Login/Register";
import OrderReview from "../pages/OrderReview/OrderReview";
import Root from "./../root/Root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/orderReview",
        element: <OrderReview></OrderReview>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/checkOut/:id",
        element: (
          <PrivetRoute>
            <CheckOut></CheckOut>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/services/${params.id}`),
      },
      {
        path: "/booking",
        element: (
          <PrivetRoute>
            <Booking></Booking>
          </PrivetRoute>
        ),
      },
    ],
  },
]);

export default router;
