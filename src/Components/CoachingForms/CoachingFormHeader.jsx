
import React from "react";
import CoachingFormModal from "./CoachingFormModal";
import Button from "../ButtonComponent/Button";
import { useState, useEffect } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

const CoachingFormHeader = () => {
  const [addSectionModal, setaddSectionModal] = useState(false);
  const [allFormData, setAllformData] = useState(() => {
    const storedArray = localStorage.getItem("allFormData");
    return storedArray ? JSON.parse(storedArray) : [];
  });
  const [searchItem, setSearchItem] = useState("");

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  useEffect(() => {
    localStorage.setItem("My Data", JSON.stringify(allFormData));
  }, [allFormData]);
  const handleFormSubmit = (newFormData) => {
    setAllformData([...allFormData, newFormData]);
  };
  const removeData = (index) => {
    const updatedData = allFormData.filter((_, item) => item !== index);
    setAllformData(updatedData);
  };

  const handleAddSectionModal = () => {
    setaddSectionModal(true);
  };

  return (
    <div className="session-header p-3 transition-all duration-500">
      <div className="flex justify-between flex-row items-center">
        <div className="left basis-2/4 p-2">
          <div>
            <h3 className="text-[#101828] text-lg font-bold">Coaching Forms</h3>
            <p>Manage your coaching forms and their details here</p>
          </div>
        </div>
        <div className="right basis-2/4  flex gap-3 justify-end items-center">
          <div className="search">
            <form action="">
              <div className="relative">
                <Search className="absolute top-2 left-2 text-gray-400 z-10" />
                <input
                  type="text"
                  className="border pl-8  rounded-lg h-9 focus:outline-gray-300 px-3 py-1 text-gray-600"
                  placeholder="search"
                  value={searchItem}
                  onChange={handleInputChange}
                />
              </div>
            </form>
          </div>
          <div className="filter-btn">
            <button   className="p-2 border border-gray rounded-md text-gray-600">
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            
          </div>
          <div className="addsession-btn">
            <button
              className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
              onClick={handleAddSectionModal}
            >
              <Plus className="w-4 h-4 text-white " /> Add Coaching Form
            </button>
          </div>
        </div>

        <CoachingFormModal
          show={addSectionModal}
          onClose={() => setaddSectionModal(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
      {/* {JSON.stringify(formData, null, 2)} */}
      <h2>Submitted Coaching Form Data:</h2>
      <div>
        {allFormData.length > 0 && (
          <ul className="">
            <div className="flex justify-between p-2">
              <h3 className="font-bold">Name</h3>
              <h3 className="font-bold">Description</h3>
              <h3 className="font-bold">Group/s</h3>
              <h3></h3>
            </div>
            {allFormData.map((data, index) => (
              <div className=" flex mb-2 gap-4">
                <li
                  className="flex justify-between w-full bg-gray-50 border border-gray-300 px-2 "
                  key={data.index}
                >
                  <div>
                    <p> {data.name}</p>
                  </div>
                  <div>
                    <p> {data.description}</p>
                  </div>
                  <div>
                    <p> {data.groups}</p>
                  </div>
                  <Button
                    className="p-2 rounded-xl bg-blue-600 text-white "
                    label="Close"
                    onClick={() => removeData(index)}
                  />
                </li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CoachingFormHeader;
