import React from "react";
import ProgressBtn from "./ProgressBtn";
const TotalTraining = () => {
  const progress = [{ icon: "1", text: "text" , backgroundColor: "blue" },{ icon: "2", text: "text", backgroundColor: "yellow" }];

  return (
    <div className="total-training bg-white max-w-[287px] shadow-xl p-5">
      <div className="training-hours">
        <h2>TOTAL TRAININGS</h2>
        <div className="flex justify-center items-baseline gap-2">
          <div className="image ">
            <img src="src/assets/dash-top-check.svg" alt="dash top check" />
          </div>
          <div className="hours">
            <h2 className="text-[50px] font-sans">23</h2>
            <span className="text-sm">Hours</span>
          </div>
        </div>
      </div>
      <div className="progress-btns">
        {progress.map((e) => (
          <ProgressBtn icon={e.icon} text={e.text} backgroundColor={e.backgroundColor}  />
        ))}
      </div>
    </div>
  );
};

export default TotalTraining;
