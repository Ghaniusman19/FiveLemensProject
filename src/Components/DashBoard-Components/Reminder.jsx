import React from "react";

const Reminder = () => {
  return (
    <div className="bg-white shadow-xl min-h-72 flex w-full p-3   border border-[#c7cfd6]">
      <div className="reminder-left flex justify-center items-center flex-col  gap-3 flex-1">
        <h3 className="text-[#3F536E] text-center font-bold">REMINDERS</h3>
        <div className="rem-image">
          <img src="src/assets/bell-icon.svg" alt="" />
        </div>
        <div className="btn ">
          <button className="flex items-center justify-center flex-col">
            <img src="src/assets/circle-plus.svg" className="mb-2" alt="" />
            <h3 className="text-[#3F536E] text-sm">ADD NEW</h3>
          </button>
        </div>
      </div>
      <div className="reminder-right flex flex-col justify-center items-center gap-4 flex-[50%]">
        <div className="right-img">
          <img src="src/assets/d-plus-grey.svg" alt="" />
        </div>
         <h2 className="text-[#AEB2B7] ">NO REMINDERS!</h2>
         <h4 className="text-[#AEB2B7] font-bold">New reminders will show here once added.</h4>
      </div>
    </div>
  );
};

export default Reminder;
