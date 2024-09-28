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
                element: <AddJob />,

            },
            {
                path: "/job/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
                element: <JobDetails />,

            },
            {
                path: "my_postedJob",
                element: <MyPostedJobs />,

            },
            {
                path: "jobupdate/:id",
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
                element: <JobUpdate />,

            },
        ]
    },
]);
export default router;