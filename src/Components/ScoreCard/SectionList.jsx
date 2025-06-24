"use client";

import { useState, useEffect, useRef } from "react";

const SectionList = ({
  sections,
  onEditSection,
  onDeleteSection,
  onAddCriteria,
  onEditCriteria,
  onDeleteCriteria,
  onUpdateCriteriaValue,
  onReorderCriteria,
  onSectionDragStart,
  onSectionDrop,
  showAddCriteriaModal,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openCriteriaMenuId, setOpenCriteriaMenuId] = useState(null);
  const menuRefs = useRef({});
  const criteriaMenuRefs = useRef({});

  // criteria drAg and drop
  const handleCriteriaDragStart = (e, sectionId, criteriaIndex) => {
    e.dataTransfer.setData("criteriaIndex", criteriaIndex);
    e.dataTransfer.setData("sectionId", sectionId);
  };

  const handleCriteriaDrop = (e, sectionId, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("criteriaIndex"), 10);
    const draggedSectionId = e.dataTransfer.getData("sectionId");
    if (draggedIndex === dropIndex && draggedSectionId === sectionId) return;
    if (typeof onReorderCriteria === "function") {
      onReorderCriteria(sectionId, draggedIndex, dropIndex);
    }
  };
  //
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openMenuId &&
        menuRefs.current[openMenuId] &&
        !menuRefs.current[openMenuId].contains(event.target)
      ) {
        setOpenMenuId(null);
      }

      if (
        openCriteriaMenuId &&
        criteriaMenuRefs.current[openCriteriaMenuId] &&
        !criteriaMenuRefs.current[openCriteriaMenuId].contains(event.target)
      ) {
        setOpenCriteriaMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId, openCriteriaMenuId]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const toggleCriteriaMenu = (id) => {
    setOpenCriteriaMenuId(openCriteriaMenuId === id ? null : id);
  };

  // Generate a unique ID for criteria menu reference
  const getCriteriaMenuId = (sectionId, criteriaId) => {
    return `${sectionId}-${criteriaId}`;
  };

  // Check if section is Total Possible Points
  const isTotalPointsSection = (section) => {
    return section.name === "Total Possible Points";
  };
  // ...existing code...

  // Calculate total possible points (sum of all criteria values in all sections except "Total Possible Points")
  const totalPossiblePoints = sections
    .filter((section) => section.name !== "Total Possible Points")
    .reduce(
      (sectionSum, section) =>
        sectionSum +
        section.criteria.reduce((sum, c) => sum + (Number(c.value) || 0), 0),
      0
    );

  return (
    <div className="mt-5">
      {sections
        .filter((section) => section.name !== "Total Possible Points")
        .map((section, index) => (
          <div
            key={section.id}
            draggable
            onDragStart={(e) =>
              onSectionDragStart && onSectionDragStart(e, index)
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onSectionDrop && onSectionDrop(e, index)}
            className="mb-4 border border-gray-200 rounded-md"
          >
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-t-md">
              <div className="font-medium flex-grow">{section.name}</div>
              <div className="font-semibold mr-5">
                {
                  // Calculate the sum of all criterion values for this section
                  section.criteria.reduce(
                    (sum, c) => sum + (Number(c.value) || 0),
                    0
                  )
                }
              </div>
              {/* Only show the menu for sections other than "Total Possible Points" */}
              {!isTotalPointsSection(section) && (
                <div
                  className="relative"
                  ref={(el) => (menuRefs.current[section.id] = el)}
                >
                  <button
                    className="p-1 flex items-center justify-center"
                    onClick={() => toggleMenu(section.id)}
                  >
                    <span className="text-xl font-bold">⋮</span>
                  </button>

                  {openMenuId === section.id && (
                    <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-[180px]">
                      <button
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                        onClick={() => {
                          onEditSection({ id: section.id, name: section.name });
                          setOpenMenuId(null);
                        }}
                      >
                        Edit Section
                      </button>
                      <button
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                        onClick={() => {
                          onDeleteSection(section.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Delete Section
                      </button>
                      <button
                        className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                        onClick={() => {
                          onAddCriteria(section.id);
                          setOpenMenuId(null);
                        }}
                      >
                        Add Scoring Criteria
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {section.criteria.length > 0 && (
              <div className="px-4 py-2.5">
                {section.criteria.map((criterion, cIndex) => {
                  const criteriaMenuId = getCriteriaMenuId(
                    section.id,
                    criterion.id
                  );
                  return (
                    <div
                      key={criterion.id}
                      className="py-2 border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                      draggable
                      onDragStart={(e) =>
                        handleCriteriaDragStart(e, section.id, cIndex)
                      }
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleCriteriaDrop(e, section.id, cIndex)}
                    >
                      <div className="flex-grow">{criterion.name}</div>
                      {/* Input for criterion value */}
                      <input
                        type="number"
                        className="w-16 border rounded px-2 py-1 mr-2"
                        value={criterion.value}
                        onChange={(e) => {
                          // Call a prop to update the value in parent
                          if (typeof onUpdateCriteriaValue === "function") {
                            onUpdateCriteriaValue(
                              section.id,
                              criterion.id,
                              Number(e.target.value)
                            );
                          }
                        }}
                        maxLength={3}
                      />
                      <div
                        className="relative"
                        ref={(el) =>
                          (criteriaMenuRefs.current[criteriaMenuId] = el)
                        }
                      >
                        <button
                          className="p-1 flex items-center justify-center"
                          onClick={() => toggleCriteriaMenu(criteriaMenuId)}
                        >
                          <span className="text-lg font-bold">⋮</span>
                        </button>

                        {openCriteriaMenuId === criteriaMenuId && (
                          <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-md z-10 min-w-[180px]">
                            <button
                              className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                              onClick={() => {
                                onEditCriteria(section.id, criterion);
                                setOpenCriteriaMenuId(null);
                              }}
                            >
                              Edit Criteria
                            </button>
                            <button
                              className="w-full text-left px-4 py-2.5 hover:bg-gray-100"
                              onClick={() => {
                                onDeleteCriteria(section.id, criterion.id);
                                setOpenCriteriaMenuId(null);
                              }}
                            >
                              Delete Criteria
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                {/* <>
                  <div className="mt-6 border-t pt-4 flex justify-between items-center">
                    <div className="font-bold text-lg">
                      Total Possible Points
                    </div>
                    <div className="font-bold text-lg">
                      {totalPossiblePoints}
                    </div>

                 
                  </div>
                </> */}
              </div>
            )}
          </div>
        ))}

      {!showAddCriteriaModal &&
        sections
          .filter((section) => section.name === "Total Possible Points")
          .map((section) => (
            <div
              key={section.id}
              className="mb-4 border border-blue-300 rounded-md bg-blue-50"
            >
              <div className="flex justify-between items-center p-4">
                <div className="font-bold text-lg">{section.name}</div>
                <div className="font-bold text-lg">
                  {sections
                    .filter((s) => s.name !== "Total Possible Points")
                    .reduce(
                      (sectionSum, s) =>
                        sectionSum +
                        s.criteria.reduce(
                          (sum, c) => sum + (Number(c.value) || 0),
                          0
                        ),
                      0
                    )}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default SectionList;
