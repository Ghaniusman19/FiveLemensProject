import Roles from "../Pages/Roles";
import DashBoard from "../Pages/DashBoard";
import Groups from "../Pages/Groups";
import Teams from "../Pages/Teams";
import Users from "../Pages/Users";
import OrgTrees from "../Pages/OrgTrees";
import Forms from "../Pages/Forms";
import Session from "../Pages/Session";
import PerformancePlan from "../Pages/PerformancePlan";
import ScoreCard from "../Pages/ScoreCard";
import PromptLibrary from "../Pages/PromptLibrary";
import Evaluation from "../Pages/Evaluation";
import Reports from "../Pages/Reports";
import Export from "../Pages/Export";
import APIs from "../Pages/APIs";
import Login from "../Pages/Login";
import PrivateRoute from "../Components/PrivateRoute";
import SignUp from "../Pages/SignUp";
import ScoreCardEdit from "../Pages/ScoreCardEdit";
import NotFound from "../Pages/NotFound";
import ForgetPassword from "../Pages/ForgetPassword";
import { Edit } from "lucide-react";
export const route = [
  {
    path: "/forget-password",
    element: <ForgetPassword />,
    isPublic: true,
  },
  {
    path: "/",
    element: <Login />,
    isPublic: true,
  },
  {
    path: "/signup",
    element: <SignUp />,
    isPublic: true,
  },
  {
    path: "*",
    element: <NotFound />,
    isPublic: true,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/organization/roles",
    element: (
      <PrivateRoute>
        <Roles />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/organization/groups",
    element: (
      <PrivateRoute>
        <Groups />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/organization/teams",
    element: (
      <PrivateRoute>
        <Teams />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/organization/users",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/organization/orgtrees",
    element: (
      <PrivateRoute>
        <OrgTrees />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/coaching/forms",
    element: (
      <PrivateRoute>
        <Forms />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/coaching/session",
    element: (
      <PrivateRoute>
        <Session />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/Quality/scorecard",
    element: (
      <PrivateRoute>
        <ScoreCard />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/Quality/scorecard/edit",
    element: (
      <PrivateRoute>
        <ScoreCardEdit />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/coaching/performanceplan",
    element: (
      <PrivateRoute>
        <PerformancePlan />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/Quality/evaluation",
    element: (
      <PrivateRoute>
        <Evaluation />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/Quality/prompt-library",
    element: (
      <PrivateRoute>
        <PromptLibrary />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/reporting/reports",
    element: (
      <PrivateRoute>
        <Reports />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/reporting/export",
    element: (
      <PrivateRoute>
        <Export />
      </PrivateRoute>
    ),
    isPublic: false,
  },
  {
    path: "/reporting/APIs",
    element: (
      <PrivateRoute>
        <APIs />
      </PrivateRoute>
    ),
    isPublic: false,
  },
];
