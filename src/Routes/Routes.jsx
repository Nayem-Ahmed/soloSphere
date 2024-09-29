import { createBrowserRouter, } from "react-router-dom";
import Root from "../LayOut/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import MyPostedJobs from "../Pages/MyPostedJob";
import JobUpdate from "../Pages/JobUpdate";
import PrivetRoute from "./PrivetRoute";
import MyBids from "../Pages/MyBids";
import BidRequests from "../Pages/BidRequests";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,

            },
            {
                path: "/login",
                element: <Login />,

            },
            {
                path: "/register",
                element: <Register />,

            },
            {
                path: "/addjob",
                element: <PrivetRoute><AddJob /></PrivetRoute>,

            },
            {
                path: "/job/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
                element: <PrivetRoute><JobDetails /></PrivetRoute>,

            },
            {
                path: "my_postedJob",
                element: <PrivetRoute><MyPostedJobs /></PrivetRoute>,

            },
            {
                path: "jobupdate/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
                element: <PrivetRoute><JobUpdate /></PrivetRoute>,

            },
            {
                path: "my_bids",
                element: <PrivetRoute><MyBids /></PrivetRoute>,

            },
            {
                path: "bid_requests",
                element: <PrivetRoute><BidRequests /></PrivetRoute>,

            },
        ]
    },
]);
export default router;