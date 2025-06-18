import ScoreCardModal from "./ScoreCardModal";
import { useState, useEffect } from "react";
import { Plus, Search, SlidersHorizontal } from "lucide-react";
const ScoreCardHeader = () => {
  const [addSectionModal, setaddSectionModal] = useState(false);
  const [checkBoxModal, setCheckBoxModal] = useState(false);
  // This is for CheckBox
  // const [isChecked, setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState({}); // Object to store checked states
  const handleCheckboxChange = (event) => {
    // setIsChecked(event.target.checked);
    setCheckBoxModal(true);
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
  const handleFormSubmit = async (newFormData) => {
    setAllformData([...allFormData, newFormData]);
  };
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
  //data coming from api stoed in state variables....
  const [apiData, setApiData] = useState(null);
  const handleEditFormSubmit = (updatedData) => {
    setAllformData((prev) =>
      prev.map((item, idx) => (idx === editIndex ? updatedData : item))
    );
    setEditModalOpen(false);
  };
  const handleAddSectionModal = async () => {
    setaddSectionModal(true);
    const handleActive = async () => {
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
    };
    handleActive();

    const handleAll = async () => {
      try {
        console.log("hey");
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
    handleAll();
  };

  // check API
  const handleAPI = async () => {
    try {
      console.log("hey");
      const response = await fetch(
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
      setApiData(data); // Save the whole response or data.data[0].contents as needed

      console.log(
        "API Response:",
        data.data.map((d) => d.title)
      );
      console.log("API Response:", data.data.map((d) => d._id));
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
            <button
              onClick={handleAPI}
              className="rounded-xl py-2 flex items-center gap-2 px-3 bg-blue-600 text-white"
            >
              check Api
            </button>
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
              <Plus className="w-4 h-4 text-white" /> Add ScoreCard
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
                  <p className="text-blue-800">{index + 1}th Index </p>
                  <p> {data.title}</p>
                  <p className="font-light">{data.title}</p>
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
                    <input
                      type="checkbox"
                      name={index}
                      checked={checkedItems[index] || false} // Use the checked state from the object
                      onChange={handleCheckboxChange}
                      id=""
                    />
                    <div className=" h-max w-full bg-black">
                      {checkedItems[index] && (
                        <div>
                          {checkBoxModal && (
                            <div className="transition-all  overflow-scroll duration-300 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                              <p className="bg-white p-6 rounded-xl max-w-max  font-bold mt-32">
                                Details for {data.title}.
                                <button
                                  className="bg-blue-500 rounded-2xl text-white p-2"
                                  onClick={() => setCheckBoxModal(false)}
                                >
                                  cancel
                                </button>
                              </p>
                            </div>
                          )}
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
      {apiData?.data && (
        <div>
          <h4>API Contents:</h4>
          <div>{apiData.data[0].contents[0]}</div>
        </div>
      )}
    </div>
  );
};

export default ScoreCardHeader;
