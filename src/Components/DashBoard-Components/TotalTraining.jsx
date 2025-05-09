import React from "react";
import ProgressBtn from "./ProgressBtn";
const TotalTraining = () => {
  const progress = [
    { icon: "src/assets/list-icon.svg", text: "Not Started" ,count : "19",  backgroundColor: "#00cfdd" },
    { icon: "src/assets/loading-icon.svg", text: "In Progress",count : "0", backgroundColor: "#feaf47" },
    { icon: "src/assets/warning-icon.svg", text: "Over Due",count : "27", backgroundColor: "#ff5b5c" },
    { icon: "src/assets/complete-icon.svg", text: "Completed",count : "21", backgroundColor: "#39da8a" },

  ];

  return (
    <div className="total-training bg-white min-w-[287px] shadow-xl p-5 border border-[#c7cfd6]">
      <div className="training-hours">
        <h2 className="text-center"> TOTAL TRAININGS</h2>
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
          <ProgressBtn icon={e.icon} text={e.text} backgroundColor={e.backgroundColor} count={e.count}  />
        ))}
      </div>
    </div>
  );
};

export default TotalTraining;
