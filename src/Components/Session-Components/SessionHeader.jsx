import Button from "../ButtonComponent/Button";
import AddSectionModal from "./AddSectionModal";
import { useState, useEffect } from "react";
const SessionHeader = () => {
  const [addSectionModal, setaddSectionModal] = useState(false);
  const [allFormData, setAllformData] = useState(() => {
    const storedArray = localStorage.getItem("allFormData");
    return storedArray ? JSON.parse(storedArray) : [];
  });
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
    <div className="session-header p-3">
      <div className="flex justify-between flex-row items-center">
        <div className="left basis-2/4 p-2">
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

        <AddSectionModal
          show={addSectionModal}
          onClose={() => setaddSectionModal(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
      {/* {JSON.stringify(formData, null, 2)} */}
      <h2>Submitted Form Data:</h2>
      <div>
        {allFormData.length > 0 && (
          <ul className="">
            {allFormData.map((data, index) => (
              <div className=" flex mb-4 gap-4 ">
                <li className="flex justify-between w-full" key={data.index}>
                  <div>
                    <h3 className="font-bold">User</h3>
                    <p> {data.groups}</p>
                  </div>

                  <div>
                    <h3 className="font-bold">Coaching Form</h3>
                    <p> {data.teams}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Primary</h3>
                    <p> {data.users}</p>
                  </div>
                  <div>
                    <h3 className="font-bold">Coached On</h3>
                    <p> {data.coaching}</p>
                  </div>
                </li>
                <Button
                  className="p-2 rounded-xl bg-blue-600 text-white"
                  label="Close"
                  onClick={() => removeData(index)}
                />
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SessionHeader;
