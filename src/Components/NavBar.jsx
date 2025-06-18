import { useState } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [organizationdropDown, setOrganizationDropDown] = useState(false);
  const [coachingDropdown, setcoachingDropdown] = useState(false);
  const [qualityDropdown, setqualityDropdown] = useState(false);
  const [reportingDropdown, setreportingDropdown] = useState(false);

  return (
    <div className="navbar min-h-16 flex items-center shadow-xl mb-10 bg-white">
      <Container>
        <nav>
          <ul className="nav-list flex items-center gap-3">
            <li>
              {" "}
              <Link to="/dashboard"> DashBoard </Link>{" "}
            </li>
            <li
              className="relative py-3"
              onMouseEnter={() => setOrganizationDropDown(true)}
              onMouseLeave={() => setOrganizationDropDown(false)}
            >
              {" "}
              <Link>Organization &#129171; </Link>
              {organizationdropDown && (
                <ul className="absolute  text-[#2A362B]  top-12 z-10 rounded-md bg-white p-2 shadow-xl w-[178px]">
                  <li>
                    {" "}
                    <Link to="/organization/roles">Roles </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="/organization/groups">Groups </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/organization/teams">Teams </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/organization/users">Users </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/organization/orgtrees">OrgTrees </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative  py-3"
              onMouseEnter={() => setcoachingDropdown(true)}
              onMouseLeave={() => setcoachingDropdown(false)}
            >
              {" "}
              <Link>Coaching &#129171; </Link>
              {coachingDropdown && (
                <ul className="absolute text-[#2A362B]  top-12 z-10 rounded-md bg-white p-2 shadow-xl  w-[178px]">
                  <li>
                    {" "}
                    <Link to="/coaching/forms">Forms </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="/coaching/session">Sessions </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/coaching/performanceplan">
                      Performance Plan{" "}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative  py-3"
              onMouseEnter={() => setqualityDropdown(true)}
              onMouseLeave={() => setqualityDropdown(false)}
            >
              <Link>Quality &#129171;</Link>
              {qualityDropdown && (
                <ul className="absolute  text-[#2A362B]  top-12 z-10 rounded-md bg-white p-2 shadow-xl  w-[178px]">
                  <li>
                    {" "}
                    <Link to="/Quality/scorecard">Scorecards </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="/Quality/evaluation">Evaluation </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/Quality/prompt-library">Promt Library </Link>
                  </li>
                </ul>
              )}
            </li>
            <li
              className="relative  py-3"
              onMouseEnter={() => setreportingDropdown(true)}
              onMouseLeave={() => setreportingDropdown(false)}
            >
              {" "}
              <Link> Reporting &#129171; </Link>
              {reportingDropdown && (
                <ul className="absolute  text-[#2A362B]  top-12 z-10 rounded-md bg-white p-2 shadow-xl  w-[178px]">
                  <li>
                    {" "}
                    <Link to="/reporting/reports">Reports </Link>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link to="/reporting/export">Exports </Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/reporting/APIs">APIs </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default NavBar;
