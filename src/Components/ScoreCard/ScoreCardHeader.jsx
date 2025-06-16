import ScoreCardModal from "./ScoreCardModal";
import { useState, useEffect } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";

const ScoreCardHeader = () => {
  const [addSectionModal, setaddSectionModal] = useState(false);
  // This is for CheckBox
  // const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({}); // Object to store checked states

  const handleCheckboxChange = (event) => {
    // setIsChecked(event.target.checked);
    const { name, checked } = event.target;
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [name]: checked, // Update the checked state for the specific checkbox
    }));
  };

  const [allFormData, setAllformData] = useState(() => {
    const storedArray = localStorage.getItem("allFormData");
    return storedArray ? JSON.parse(storedArray) : [];
  });
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    localStorage.setItem("allFormData", JSON.stringify(allFormData));
  }, [allFormData]);
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  // useEffect(() => {
  //   localStorage.setItem("My Data", JSON.stringify(allFormData));
  // }, [allFormData]);
  const handleFormSubmit = async (newFormData) => {
    setAllformData([...allFormData, newFormData]);
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/scorecards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(newFormData),
        }
      );
      const data = await response.json();
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  // This is to remove data or i mean remove full list array of data
  // const removeData = (index) => {
  //   const updatedData = allFormData.filter((_, i) => i !== index);
  //   setAllformData(updatedData);
  // };
  //   const removeData = (index) => {
  //     const updatedData = allFormData.filter((_, item) => item !== index);
  //     setAllformData(updatedData);
  //   };

  //state for the opening and closing of the dropdown clicked on the 3 dots in scoreheader.jsx
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /////////
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewFormData, setViewFormData] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const handleEditFormSubmit = (updatedData) => {
    setAllformData((prev) =>
      prev.map((item, idx) => (idx === editIndex ? updatedData : item))
    );
    setEditModalOpen(false);
  };
  const handleAddSectionModal = async () => {
    setaddSectionModal(true);
    try {
      const response = fetch(
        "https://fldemo.fivelumenstest.com/api/auth/coaching-forms/all?isActive=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = fetch(
        "https://fldemo.fivelumenstest.com/api/auth/groups/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="session-header p-3 transition-all duration-500">
      <div className="flex justify-between flex-row items-center">
        <div className="left basis-2/4 p-2">
          <div>
            <h3 className="text-[#101828] text-xl font-bold">Scorecards</h3>
            <p className="font-sans font-normal text-gray-600">
              Manage your scorecards and its details here
            </p>
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
            <button className="p-2 border border-gray rounded-md text-gray-600">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
          <div className="addsession-btn">
            <button
              className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
              onClick={handleAddSectionModal}
            >
              <Plus className="w-4 h-4 text-white " /> Add ScoreCard
            </button>
          </div>
        </div>

        <ScoreCardModal
          show={addSectionModal}
          onClose={() => setaddSectionModal(false)}
          onSubmit={handleFormSubmit}
          shouldNavigate={true} // <-- This form should NOT navigate
        />
        <ScoreCardModal
          show={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          initialData={viewFormData}
          isView={true} // pass a prop to indicate view mode
          shouldNavigate={true} // <-- This form should NOT navigate
          title="View Scorecard"
        />
        <ScoreCardModal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          initialData={editFormData}
          onSubmit={(updatedData) => handleEditFormSubmit(updatedData)}
          shouldNavigate={false} // <-- This form should NOT navigate
          title="Edit Scorecard"
        />
        <ScoreCardModal
          show={cloneModalOpen}
          onClose={() => setCloneModalOpen(false)}
          onSubmit={handleFormSubmit}
          shouldNavigate={true}
          title="Clone Scorecard"
        />
      </div>
      {allFormData.length > 0 && (
        <ul className="">
          <div className="flex justify-between p-2 w-full">
            <h3 className="font-bold">Name & Description</h3>
            <h3 className="font-bold">Evaluation</h3>
            <h3 className="font-bold">Scoring</h3>
            <h3 className="font-bold">Updated</h3>
            <h3 className="font-bold">Status</h3>
            <h3 className="font-bold"></h3>
          </div>
          {allFormData.map((data, index) => (
            <div className=" flex mb-2 gap-4" key={index}>
              <li className="flex relative justify-between items-center w-full bg-gray-50 border border-gray-300 p-2 ">
                <div>
                  <p>{index} </p>
                  <p> {data.name}</p>
                  <p>{data.description}</p>
                </div>
                <div>
                  <p> {data.evaluationType}</p>
                </div>
                <div>
                  <p> {data.scoringModel}</p>
                </div>
                <div>
                  <p> {data.scoringModel}</p>
                </div>
                <div>
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      name={index}
                      checked={checkedItems[index] || false}
                      onChange={handleCheckboxChange}
                      id=""
                    />{" "}
                    <div className="relative h-max w-full">
                      {checkedItems[index] && (
                        <div>
                          <p className="absolute z-50 h-max  min-w-28 p-2 bg-gray-200">
                            Details for {data.name}.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 rounded-xl relative "
                  onClick={() => handleDropdownToggle(index)}
                >
                  &#8942;
                </button>
                {openDropdownIndex === index && (
                  <div className="dropdown-menu absolute right-0 top-10 mt-2 w-40 bg-white border rounded shadow z-50">
                    <ul>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setViewFormData(data);
                            setViewModalOpen(true);
                            setOpenDropdownIndex(null); // close dropdown
                          }}
                        >
                          View
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setEditFormData(data);
                            setEditIndex(index);
                            setEditModalOpen(true);
                            setOpenDropdownIndex(null); // close dropdown
                          }}
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            setCloneModalOpen(true);
                            setOpenDropdownIndex(null);
                          }}
                        >
                          Clone
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                          Evaluate
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </div>
          ))}
        </ul>
      )}
      {/* {JSON.stringify(formData, null, 2)} */}
      {/* <h2>Submitted Coaching Form Data:</h2> */}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default ScoreCardHeader;
