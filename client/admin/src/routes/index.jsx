import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ContentLayout from "../layout/ContentLayout";
import JobListPage from "../pages/JobListPage";
import UserListPage from "../pages/UserListPage";
import CompanyListPage from "../pages/CompanyListPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (access_token) {
        return redirect("/users");
      }

      return null;
    },
  },
  {
    element: <ContentLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/users"} />,
      },
      {
        path: "/users",
        element: <UserListPage />,
      },
      {
        path: "/job-board",
        element: <JobListPage />,
      },
      {
        path: "/companies",
        element: <CompanyListPage />,
      },
    ],
    loader: () => {
      const access_token = localStorage.getItem("access_token");

      if (!access_token) {
        return redirect("/login");
      }

      return null;
    },
  },
]);

export default router;
