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
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/orderReview',
            element: <OrderReview></OrderReview>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
    ]
  },
]);

export default router;
