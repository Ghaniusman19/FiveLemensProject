import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Settings } from "lucide-react";
import { useState, useEffect } from "react";
import Components from "../Constants/index.js";
const {
  EditSectionModal,
  AddCriteriaModal,
  AddSectionModal,
  SectionList,
  Container,
  ScoreCardModal,
  EditCriteriaModal,
} = Components;
import { forms, authToken } from "../Constants/constants.js";
const ScoreCardEdit = () => {
  useEffect(() => {
    const handleAll = async () => {
      try {
        const response = fetch(
          "https://fldemo.fivelumenstest.com/api/auth/groups/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: authToken,
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
    const handleActive = async () => {
      try {
        const response = fetch(
          "https://fldemo.fivelumenstest.com/api/auth/coaching-forms/all?isActive=true",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: authToken,
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
    const handleScoreCardEdit = async () => {
      try {
        const response = fetch(
          "https://fldemo.fivelumenstest.com/api/auth/scorecards/edit",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authToken,
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
    handleScoreCardEdit();
  }, []);
  const [showScoreCardModal, setShowScoreCardModal] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const title =
    location.state?.title ||
    localStorage.getItem("scorecardtitle") ||
    " Scorecard ";

  // ...inside ScoreCardEdit component...
  const handleSettingsClick = async () => {
    // setEditFormData(settingsFormData); // or fetch latest if needed
    const savedData = localStorage.getItem("scorecardData");
    if (savedData) {
      setEditFormData(JSON.parse(savedData));
    } else {
      setEditFormData(null); // fallback to empty if nothing saved
    }
    setShowScoreCardModal(true);
    // Fetch the latest scorecard data (replace with your API endpoint)
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/groups/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
          body: JSON.stringify(), 
        }
      );

      const data = await response.json();
      console.log(data);

      // setSettingsFormData(data); // Pre-fill modal with fetched data
    } catch (error) {
      console.error("Failed to fetch scorecard data:", error);
    }
  };
  // ...existing code...
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [sections, setSections] = useState([]);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const handleMetaDragStart = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleMetaDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("itemIndex"), 10);
    if (draggedIndex === dropIndex) return;
    const updatedItems = [...sections];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);
    bs;
    setSections(updatedItems);
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };
  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("itemIndex"), 10);
    if (draggedIndex === dropIndex) return;
    const updatedItems = [...section1];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);

    setSections1(updatedItems);
  };
  //drag and drop
  //criteria drag and drop
  const handleReorderCriteria = (sectionId, fromIndex, toIndex) => {
    setSections1((sections) =>
      sections.map((section) => {
        if (section.id !== sectionId) return section;
        const updatedCriteria = [...section.criteria];
        const [moved] = updatedCriteria.splice(fromIndex, 1);
        updatedCriteria.splice(toIndex, 0, moved);
        return { ...section, criteria: updatedCriteria };
      })
    );
  };
  // section drag and drop
  const handleSectionDragStart = (e, index) => {
    e.dataTransfer.setData("sectionIndex", index);
  };
  const handleSectionDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("sectionIndex"), 10);
    if (draggedIndex === dropIndex) return;
    // Don't allow reordering the Total Possible Points section
    const totalPointsSection = section1.find(
      (section) => section.name === "Total Possible Points"
    );
    const otherSections = section1.filter(
      (section) => section.name !== "Total Possible Points"
    );
    const updatedSections = [...otherSections];
    const [draggedSection] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(dropIndex, 0, draggedSection);
    setSections1([...updatedSections, totalPointsSection]);
  };
  //comments
  const [section1, setSections1] = useState([]);
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [showEditSectionModal, setShowEditSectionModal] = useState(false);
  const [showAddCriteriaModal, setShowAddCriteriaModal] = useState(false);
  const [showEditCriteriaModal, setShowEditCriteriaModal] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [currentSectionForCriteria, setCurrentSectionForCriteria] =
    useState(null);
  const [currentCriteria, setCurrentCriteria] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);
  // handle update criteria value
  const handleUpdateCriteriaValue = (sectionId, criteriaId, newValue) => {
    setSections1((sections) =>
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              criteria: section.criteria.map((criterion) =>
                criterion.id === criteriaId
                  ? { ...criterion, value: newValue }
                  : criterion
              ),
            }
          : section
      )
    );
  };
  // Initialize with Total Possible Points section at the end
  useEffect(() => {
    setSections1([
      { id: "1", name: "Total Possible Points", criteria: [], value: 0 },
    ]);
  }, []);
  // Close dropdowns and modals when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close add menu dropdown if clicking outside
      if (showAddMenu && !event.target.closest(".menu-container")) {
        setShowAddMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAddMenu]);
  const handleAddSection = (sectionName) => {
    const newSection = {
      id: Date.now().toString(),
      name: sectionName,
      criteria: [],
      value: 0,
    };

    // Add new section before the Total Possible Points section
    const totalPointsSection = section1.find(
      (section) => section.name === "Total Possible Points"
    );
    const otherSections = section1.filter(
      (section) => section.name !== "Total Possible Points"
    );

    setSections1([...otherSections, newSection, totalPointsSection]);
    setShowAddSectionModal(false);
  };
  const handleEditSection1 = (id, newName) => {
    setSections1(
      section1.map((section) =>
        section.id === id ? { ...section, name: newName } : section
      )
    );
    setShowEditSectionModal(false);
  };
  const handleDeleteSection1 = (id) => {
    // Don't allow deletion of Total Possible Points section
    //yaani jo last wala total score card wala section hai wo kabhi delete na ho...
    if (
      section1.find((section) => section.id === id)?.name ===
      "Total Possible Points"
    ) {
      return;
    }
    setSections1(section1.filter((section) => section.id !== id));
  };
  const handleAddCriteria = (criteriaName) => {
    if (currentSectionForCriteria) {
      setSections1(
        section1.map((section) =>
          section.id === currentSectionForCriteria
            ? {
                ...section,
                criteria: [
                  ...section.criteria,
                  { id: Date.now().toString(), name: criteriaName },
                ],
              }
            : section
        )
      );
    }
    setShowAddCriteriaModal(false);
  };
  const handleEditCriteria = (sectionId, criteriaId, newName) => {
    setSections1(
      section1.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              criteria: section.criteria.map((criteria) =>
                criteria.id === criteriaId
                  ? { ...criteria, name: newName }
                  : criteria
              ),
            }
          : section
      )
    );
    setShowEditCriteriaModal(false);
  };
  const handleDeleteCriteria = (sectionId, criteriaId) => {
    setSections1(
      section1.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              criteria: section.criteria.filter(
                (criteria) => criteria.id !== criteriaId
              ),
            }
          : section
      )
    );
  };
  //comments
  const [tags, setTags] = useState([]);
  const removeTag = (indexToRemove) => {
    setFirstLevelTags(
      firstLevelTags.filter((_, index) => index !== indexToRemove)
    );
  };
  const removesecondlevelTag = (firstIndex, secondIndex) => {
    const updated = [...secondLevelTags];
    updated[firstIndex] = updated[firstIndex].filter(
      (_, i) => i !== secondIndex
    );
    setSecondLevelTags(updated);
  };
  const handleButtonClick = (formKey) => {
    setIsDropdownOpen(false); // Close dropdown
    setActiveModal(formKey); // Open specific modal
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // For single select, save tags in formData
    const structuredData = {
      description: formData.description,
      firstLevel: firstLevelTags.map((firstTag, i) => ({
        value: firstTag,
        secondLevel: secondLevelTags[i].map((secondTag, j) => ({
          value: secondTag,
          thirdLevel: thirdLevelTags[i]?.[j] || [],
        })),
      })),
    };
    localStorage.setItem("scorecardData", JSON.stringify(structuredData));
    console.log("structured data of form 1 is", structuredData);

    let updatedFormData = { ...formData };
    if (activeModal === "form1") {
      updatedFormData.singleSelect = [...tags];
    }
    setTags([]); // Clear tags on submit
    fetch(`http://localhost:5173/api/scorecards/${id}`, {
      method: "POST", // or "PUT" for editing
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        // handle success
        console.log("Form submitted successfully:", data);
      })
      .catch((err) => {
        // handle error
        console.error("Error submitting form:", err);
      });
    if (editingSectionId) {
      // Edit mode: update the section
      setSections(
        sections.map((section) =>
          section.id === editingSectionId
            ? { ...section, data: updatedFormData }
            : section
        )
      );
      setEditingSectionId(null);
    } else {
      // Add mode: add new section
      const newSection = {
        id: Date.now(),
        title: forms[activeModal].title,
        data: updatedFormData,
      };
      setSections([...sections, newSection]);
    }
    setActiveModal(null);
    setFormData({});
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For checkbox-group (multiple checkboxes with same name)
    if (
      type === "checkbox" &&
      e.target.getAttribute("data-group") === "checkbox-group"
    ) {
      setFormData((prev) => {
        const arr = Array.isArray(prev[name]) ? prev[name] : [];
        if (checked) {
          return { ...prev, [name]: [...arr, value] };
        } else {
          return { ...prev, [name]: arr.filter((v) => v !== value) };
        }
      });
    }
    // For single checkbox
    else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    }
    // For all other input types
    else {
      setFormData({ ...formData, [name]: value });
      console.log(formData);
    }
  };
  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  const handleEditSection = (id) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    setFormData(sectionToEdit.data);
    // Pre-fill tags for single select
    if (
      sectionToEdit.title === forms.form1.title &&
      Array.isArray(sectionToEdit.data.singleSelect)
    ) {
      setTags(sectionToEdit.data.singleSelect);
    } else {
      setTags([]);
    }
    setActiveModal(
      Object.keys(forms).find((key) => forms[key].title === sectionToEdit.title)
    );
    setEditingSectionId(id); // Track which section is being edited
  };
  ///////////functionality of nested
  //ye saari states or code is liye hai taake nested tags kaam karein
  const [firstLevelInput, setFirstLevelInput] = useState("");
  const [firstLevelTags, setFirstLevelTags] = useState([]);
  const [enableSecondLevel, setEnableSecondLevel] = useState(false);
  const [secondLevelTags, setSecondLevelTags] = useState([]);
  const [secondLevelInputs, setSecondLevelInputs] = useState([]);
  const [thirdLevelCheckboxes, setThirdLevelCheckboxes] = useState([]);
  const [thirdLevelTags, setThirdLevelTags] = useState([]);
  const [thirdLevelInputs, setThirdLevelInputs] = useState([]);
  //  second level arrays when first level tags change
  useEffect(() => {
    setSecondLevelTags(firstLevelTags.map(() => []));
    setSecondLevelInputs(firstLevelTags.map(() => ""));
    setThirdLevelCheckboxes(firstLevelTags.map(() => false));
    setThirdLevelTags(firstLevelTags.map(() => []));
    setThirdLevelInputs(firstLevelTags.map(() => []));
  }, [firstLevelTags]);

  const handleFirstLevelKeyDown = (e) => {
    if (e.key === "Enter" && firstLevelInput.trim()) {
      e.preventDefault();
      setFirstLevelTags([...firstLevelTags, firstLevelInput.trim()]);
      setFirstLevelInput("");
    }
  };
  const handleSecondLevelKeyDown = (e, index) => {
    if (e.key === "Enter" && secondLevelInputs[index].trim()) {
      e.preventDefault();
      const newTags = [...secondLevelTags];
      newTags[index].push(secondLevelInputs[index].trim());
      setSecondLevelTags(newTags);

      const newInputs = [...secondLevelInputs];
      newInputs[index] = "";
      setSecondLevelInputs(newInputs);

      // Reset third level inputs for this second-level tag group
      const newThirdLevelInputs = [...thirdLevelInputs];
      newThirdLevelInputs[index].push("");
      setThirdLevelInputs(newThirdLevelInputs);

      const newThirdLevelTags = [...thirdLevelTags];
      newThirdLevelTags[index].push([]);
      setThirdLevelTags(newThirdLevelTags);
    }
  };
  const handleThirdLevelKeyDown = (e, firstIndex, secondIndex) => {
    if (e.key === "Enter" && thirdLevelInputs[firstIndex][secondIndex].trim()) {
      e.preventDefault();
      const tagsCopy = [...thirdLevelTags];
      tagsCopy[firstIndex][secondIndex].push(
        thirdLevelInputs[firstIndex][secondIndex].trim()
      );
      setThirdLevelTags(tagsCopy);

      const inputsCopy = [...thirdLevelInputs];
      inputsCopy[firstIndex][secondIndex] = "";
      setThirdLevelInputs(inputsCopy);
    }
  };
  // Remove third-level tag
  const removeThirdLevelTag = (firstIndex, secondIndex, thirdIndex) => {
    const tagsCopy = [...thirdLevelTags];
    tagsCopy[firstIndex][secondIndex] = tagsCopy[firstIndex][
      secondIndex
    ].filter((_, i) => i !== thirdIndex);
    setThirdLevelTags(tagsCopy);
  };
  const handleFormCancel = () => {
    setActiveModal(null);
    setFormData("");
  };
  return (
    <div>
      <Container>
        {showScoreCardModal && (
          <ScoreCardModal
            show={showScoreCardModal}
            onClose={() => setShowScoreCardModal(false)}
            onSubmit={(formData) => {
              localStorage.setItem("scorecardData", JSON.stringify(formData));
              setShowScoreCardModal(false);
            }}
            initialData={editFormData}
            isEdit={true}
          />
        )}
        <div className="manage-scorecard bg-white rounded-xl p-3 transition-all duration-500">
          <div className="flex justify-between flex-row items-center">
            <div className="left basis-2/4 p-2">
              <div>
                <h1 className="text-black font-bold text-2xl">{title}</h1>

                <p className="font-sans font-normal text-gray-600">
                  Design your scorecard by adding or removing different meta
                  data fields or scoring criteria
                </p>
              </div>
            </div>
            <div className="right basis-2/4  flex gap-3 justify-end items-center">
              <div className="settings flex items-center justify-center">
                <button
                  className="rounded-xl border border-gray px-2 py-1.5"
                  onClick={handleSettingsClick}
                >
                  <Settings className="w-5 h-6 text-gray-700" />
                </button>
              </div>
              <div className="filter-btn">
                <button className=" px-2 py-1.5 border border-gray rounded-md text-gray-600">
                  Save Only
                </button>
              </div>
              <div className="addsession-btn">
                <button
                  className="rounded-xl px-3 py-1.5 flex items-center gap-2  bg-blue-600 text-white"
                  //   onClick={handleAddSectionModal}
                >
                  Save & Publish
                </button>
              </div>
            </div>
          </div>
          <hr className="bg-gray-800 " />
          {/* meta data , scoring and total possible points sections  */}

          <div className="meta-data-wrapper">
            <div className="px-6 pb-0 pt-6  mx-auto">
              {/* Dropdown Trigger Button */}
              <div className="relative">
                <div className="flex justify-between items-center  bg-blue-100 py-2.5 px-1.5 relative">
                  <h3 className="font-bold text-xl">Meta Data</h3>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="  text-gray border border-gray px-4 py-2 rounded-lg"
                  >
                    &#8942;
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute mt-2 w-48 bg-white rounded-md right-0 shadow-lg z-10">
                    {Object.keys(forms).map((formKey) => (
                      <button
                        key={formKey}
                        onClick={() => handleButtonClick(formKey)}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        {forms[formKey].title}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal for Active Form */}
              {activeModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
                  <div className="bg-white p-6 rounded-lg shadow-xl  w-[50%]  modal-scrollable ">
                    <h2 className="text-xl font-bold mb-4">
                      {forms[activeModal].title}
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <div>
                        {forms[activeModal].fields.map((field) => (
                          <div key={field.name} className="mb-4 ">
                            <label className="block text-gray-700 mb-2">
                              {field.label}:
                            </label>
                            {field.type === "textarea" && (
                              <textarea
                                name={field.name}
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                placeholder="Enter single select entry description here..."
                              />
                            )}
                            {field.type === "input" && (
                              <input
                                type="text"
                                name={field.name}
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            )}
                            {field.type === "select" && (
                              <div
                                name={field.name}
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none min-h-10 focus:ring-2 focus:ring-blue-500 "
                                required
                              >
                                <div className="tags-input-container flex flex-wrap ">
                                  {firstLevelTags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className="bg-blue-200 px-3 py-1 rounded-full"
                                    >
                                      {tag}
                                      <span
                                        onClick={() => removeTag(i)}
                                        className="close-button cursor-pointer
                                          ml-2"
                                      >
                                        &times;
                                      </span>
                                    </span>
                                  ))}
                                  <input
                                    type="text"
                                    value={firstLevelInput}
                                    onChange={(e) =>
                                      setFirstLevelInput(e.target.value)
                                    }
                                    onKeyDown={handleFirstLevelKeyDown}
                                    placeholder="Type & press Enter"
                                    className="border px-2 py-1 rounded"
                                  />
                                </div>
                                {firstLevelTags.length === 0 ? (
                                  <span className="text-red-500">required</span>
                                ) : (
                                  ""
                                )}
                              </div>
                            )}

                            {field.type === "checkbox-group" && (
                              <div>
                                {field.options.map((opt) => (
                                  <label key={opt} className="mr-4">
                                    <input
                                      type="checkbox"
                                      name={field.name}
                                      value={opt}
                                      data-group="checkbox-group"
                                      checked={
                                        Array.isArray(formData[field.name]) &&
                                        formData[field.name].includes(opt)
                                      }
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        setFormData((prev) => {
                                          const arr = Array.isArray(
                                            prev[field.name]
                                          )
                                            ? prev[field.name]
                                            : [];
                                          if (checked) {
                                            return {
                                              ...prev,
                                              [field.name]: [...arr, opt],
                                            };
                                          } else {
                                            return {
                                              ...prev,
                                              [field.name]: arr.filter(
                                                (v) => v !== opt
                                              ),
                                            };
                                          }
                                        });
                                      }}
                                    />
                                    {opt}
                                  </label>
                                ))}
                              </div>
                            )}
                            {field.type === "date" && (
                              <input
                                type="date"
                                name={field.name}
                                onChange={handleInputChange}
                                value={formData[field.name] || ""}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                              />
                            )}
                          </div>
                        ))}
                        <div className="py-2 flex justify-between">
                          <label>Add Second Level</label>
                          <input
                            type="checkbox"
                            checked={enableSecondLevel}
                            onChange={(e) =>
                              setEnableSecondLevel(e.target.checked)
                            }
                          />
                        </div>

                        <div className="">
                          {enableSecondLevel && (
                            <div className="space-y-4">
                              {firstLevelTags.map((tag, i) => (
                                <div key={i} className="border p-3 rounded-md">
                                  <p className="font-medium mb-2">
                                    {tag} - Second Level
                                  </p>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {secondLevelTags[i]?.map((stag, j) => (
                                      <span
                                        key={j}
                                        className="bg-green-200 px-3 py-1 rounded-full"
                                      >
                                        {stag}
                                        <span
                                          className="close-button cursor-pointer"
                                          onClick={() =>
                                            removesecondlevelTag(i, j)
                                          }
                                        >
                                          &times;
                                        </span>
                                      </span>
                                    ))}
                                    <input
                                      type="text"
                                      value={secondLevelInputs[i] || ""}
                                      onChange={(e) => {
                                        const newInputs = [
                                          ...secondLevelInputs,
                                        ];
                                        newInputs[i] = e.target.value;
                                        setSecondLevelInputs(newInputs);
                                      }}
                                      onKeyDown={(e) =>
                                        handleSecondLevelKeyDown(e, i)
                                      }
                                      placeholder="Add second-level tag"
                                      className="border px-2 py-1 rounded"
                                    />
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <label>Add Third Level</label>
                                    <input
                                      type="checkbox"
                                      checked={thirdLevelCheckboxes[i] || false}
                                      onChange={(e) => {
                                        const updated = [
                                          ...thirdLevelCheckboxes,
                                        ];
                                        updated[i] = e.target.checked;
                                        setThirdLevelCheckboxes(updated);
                                      }}
                                    />
                                  </div>

                                  {thirdLevelCheckboxes[i] && (
                                    <div className="mt-3 space-y-4">
                                      {secondLevelTags[i].map((stag, j) => (
                                        <div key={j}>
                                          <p className="text-sm font-semibold">
                                            {stag} - Third Level
                                          </p>
                                          <div className="flex flex-wrap gap-2">
                                            {thirdLevelTags[i]?.[j]?.map(
                                              (ttag, k) => (
                                                <span
                                                  key={k}
                                                  className="bg-yellow-200 px-3 py-1 rounded-full flex items-center"
                                                >
                                                  {ttag}
                                                  <span
                                                    className="close-button cursor-pointer ml-2"
                                                    onClick={() =>
                                                      removeThirdLevelTag(
                                                        i,
                                                        j,
                                                        k
                                                      )
                                                    }
                                                  >
                                                    &times;
                                                  </span>
                                                </span>
                                              )
                                            )}
                                            <input
                                              type="text"
                                              value={
                                                thirdLevelInputs[i]?.[j] || ""
                                              }
                                              onChange={(e) => {
                                                const inputsCopy = [
                                                  ...thirdLevelInputs,
                                                ];
                                                if (!inputsCopy[i])
                                                  inputsCopy[i] = [];
                                                inputsCopy[i][j] =
                                                  e.target.value;
                                                setThirdLevelInputs(inputsCopy);
                                              }}
                                              onKeyDown={(e) =>
                                                handleThirdLevelKeyDown(e, i, j)
                                              }
                                              placeholder="Add third-level tag"
                                              className="border px-2 py-1 rounded"
                                            />
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="py-2 flex">
                          <input
                            type="checkbox"
                            className="mr-3"
                            name=""
                            id="metadatafield"
                          />
                          <label htmlFor="metadatafield">
                            This meta data entry field is required
                          </label>
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={handleFormCancel}
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Dynamic Sections */}
              <div className=" space-y-4">
                {sections.map((section, index) => (
                  <div
                    draggable
                    onDragStart={(e) => handleMetaDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleMetaDrop(e, index)}
                    key={section.id}
                    className="border  rounded-lg p-4 shadow-sm"
                  >
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index)}
                      className="flex justify-between items-center"
                    >
                      <h3 className="text-lg font-semibold">
                        {section.data?.description && (
                          <p className="text-gray-600 mt-1">
                            {section.data.description}
                          </p>
                        )}
                      </h3>

                      <div className="relative">
                        <button
                          onClick={() =>
                            document
                              .getElementById(`dropdown-${section.id}`)
                              .classList.toggle("hidden")
                          }
                          className="p-1 rounded hover:bg-gray-200 "
                        >
                          &#8942;
                        </button>
                        <div
                          id={`dropdown-${section.id}`}
                          className="hidden absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10"
                        >
                          <button
                            onClick={() => handleEditSection(section.id)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSection(section.id)}
                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* scoring section starts here */}
            <div className="flex justify-between  relative bg-blue-100 py-2.5 px-1.5">
              <h1 className="heading font-bold text-2xl">Scoring</h1>

              <div className="menu-container relative ">
                <button
                  className="p-1 flex items-center justify-center"
                  onClick={() => setShowAddMenu(!showAddMenu)}
                >
                  <span className="text-xl font-bold">⋮</span>
                </button>
                {showAddMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-[180px]">
                    <button
                      className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                      onClick={() => {
                        setShowAddSectionModal(true);
                        setShowAddMenu(false);
                      }}
                    >
                      Add Section
                    </button>
                  </div>
                )}
              </div>
            </div>

            <SectionList
              sections={section1}
              showAddCriteriaModal={showAddCriteriaModal}
              onEditSection={(section) => {
                setCurrentSection(section);
                setShowEditSectionModal(true);
              }}
              onDeleteSection={handleDeleteSection1}
              onAddCriteria={(sectionId) => {
                setCurrentSectionForCriteria(sectionId);
                setShowAddCriteriaModal(true);
              }}
              onEditCriteria={(sectionId, criteria) => {
                setCurrentSectionForCriteria(sectionId);
                setCurrentCriteria(criteria);
                setShowEditCriteriaModal(true);
              }}
              onDeleteCriteria={handleDeleteCriteria}
              onUpdateCriteriaValue={handleUpdateCriteriaValue}
              onReorderCriteria={handleReorderCriteria}
              onSectionDragStart={handleSectionDragStart}
              onSectionDrop={handleSectionDrop}
            />

            {showAddSectionModal && (
              <AddSectionModal
                onClose={() => setShowAddSectionModal(false)}
                onAdd={handleAddSection}
              />
            )}

            {showEditSectionModal && currentSection && (
              <EditSectionModal
                section={currentSection}
                onClose={() => setShowEditSectionModal(false)}
                onSave={handleEditSection1}
              />
            )}

            {showAddCriteriaModal && (
              <AddCriteriaModal
                onClose={() => setShowAddCriteriaModal(false)}
                onAdd={handleAddCriteria}
              />
            )}

            {showEditCriteriaModal &&
              currentCriteria &&
              currentSectionForCriteria && (
                <EditCriteriaModal
                  criteria={currentCriteria}
                  onClose={() => setShowEditCriteriaModal(false)}
                  onSave={(newName) =>
                    handleEditCriteria(
                      currentSectionForCriteria,
                      currentCriteria.id,
                      newName
                    )
                  }
                />
              )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ScoreCardEdit;
