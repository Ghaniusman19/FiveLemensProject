import React from "react";
import Container from "../Components/Container";
import CoachingFormHeader from "../Components/CoachingForms/CoachingFormHeader";

const Forms = () => {
  return (
    <div className="bg-gray-100 ">
      <Container>
        <div className="bg-white rounded-xl shadow-lg">
          <CoachingFormHeader />
        </div>
      </Container>
    </div>
  );
};

export default Forms;
