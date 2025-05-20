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
import ScoreCardEdit from "../Pages/ScoreCardEdit";
export const route = [
  { path: "/", element: <DashBoard /> },
  { path: "/dashboard", element: <DashBoard /> },
  { path: "/organization/roles", element: <Roles /> },
  { path: "/organization/groups", element: <Groups /> },
  { path: "/organization/teams", element: <Teams /> },
  { path: "/organization/users", element: <Users /> },
  { path: "/organization/orgtrees", element: <OrgTrees /> },
  { path: "/coaching/forms", element: <Forms /> },
  { path: "/coaching/session", element: <Session /> },
  { path: "/Quality/scorecard", element: <ScoreCard /> },
  { path: "/Quality/scorecard/edit", element: <ScoreCardEdit /> },
  { path: "/coaching/performanceplan", element: <PerformancePlan /> },
  { path: "/Quality/evaluation", element: <Evaluation /> },
  { path: "/Quality/promptlibrary", element: <PromptLibrary /> },
  { path: "/reporting/reports", element: <Reports /> },
  { path: "/reporting/export", element: <Export /> },
  { path: "/reporting/APIs", element: <APIs /> },
];
