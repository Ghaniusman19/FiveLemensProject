import React from "react";
import Container from "../Components/Container";
import TotalTraining from "../Components/DashBoard-Components/TotalTraining";
const DashBoard = () => {
  return (
    <div className="dashboard mt-5">
      <Container>
        <TotalTraining />
      </Container>
    </div>
  );
};

export default DashBoard;
