import { useState } from "react";
import ReminderModal from "./ReminderModal";
const Reminder = () => {
   const [showModal, setShowModal] = useState(false);
    const [reminders, setReminders] = useState([]);

  const handleAddClick = () => {
    setShowModal(true);
  };

   const handleSubmit = (newReminder) => {
    setReminders((prev) => [...prev, newReminder]);
  };
  return (
    <div className="bg-white shadow-xl min-h-72 flex w-full p-3   border border-[#c7cfd6]">
      <div className="reminder-left flex justify-center items-center flex-col  gap-3 flex-1">
        <h3 className="text-[#3F536E] text-center font-bold">REMINDERS</h3>
        <div className="rem-image">
          <img src="src/assets/bell-icon.svg" alt="" />
        </div>
        <div className="btn ">
          <button className="flex items-center justify-center flex-col "  onClick={handleAddClick}>
            <img src="src/assets/circle-plus.svg" className="mb-2" alt="" />
            <h3 className="text-[#3F536E] text-sm">ADD NEW</h3>
          </button>
        </div>
        <ReminderModal show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit} />
      </div>
      <div className="reminder-right flex flex-col items-center gap-4 flex-[50%]">
       
         {reminders.length === 0 ? ( 
          <>
          <div className="right-img">
          <img src="src/assets/d-plus-grey.svg" alt="" />
        </div>
         <h2 className="text-[#AEB2B7] ">NO REMINDERS!  </h2>
         <h4 className="text-[#AEB2B7] font-bold">New reminders will show here once added.</h4> </>) : (
        <table className="mt-8 w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  );
};

export default Reminder;
