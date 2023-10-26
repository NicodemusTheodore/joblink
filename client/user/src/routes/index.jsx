import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import JobBoardPage from "../pages/JobBoardPage";
import JobDetailPage from "../pages/JobDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/job-board",
    element: <JobBoardPage />,
  },
  {
    path: "/job-board/:id",
    element: <JobDetailPage />,
  },
]);

export default router;
