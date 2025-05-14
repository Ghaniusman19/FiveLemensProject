import Button from "../ButtonComponent/Button";
import AddSectionModal from "./AddSectionModal";
import { useState } from "react";
const SessionHeader = () => {
  const [addSectionModal , setaddSectionModal] = useState(false)
  const handleAddSectionModal = () => {
    setaddSectionModal(true)
  }
  return (
    <div className="session-header p-3">
      <div className="flex justify-between flex-row items-center">
        <div className="left basis-2/4 p-2 ">
          <div>
            <h3 className="text-[#101828] text-lg font-bold">
              Coaching Sessions
            </h3>
            <p>Manage your All Coaching Session and Detail Here</p>
          </div>
        </div>
        <div className="right basis-2/4  flex gap-3 justify-end items-center">
          <div className="search">
            <form action="">
              <div>
                <input
                  type="text"
                  className="border  rounded-lg h-9 focus:outline-gray-300 px-3 py-1 text-gray-600"
                  placeholder="search"
                />
              </div>
            </form>
          </div>
          <div className="filter-btn">
            <Button
              label="filter"
              className="p-2 border border-gray rounded-md text-gray-600"
            />
          </div>
          <div className="addsession-btn">
            <Button
              label=" Add Section"
              className="rounded-xl py-2 px-3 bg-blue-600 text-white"
              onClick={handleAddSectionModal}
            />
          </div>
        </div>

        <AddSectionModal  ReminderModal show={addSectionModal}
        onClose={() => setaddSectionModal(false)}
        />
      </div>
    </div>
  );
};

export default SessionHeader;
