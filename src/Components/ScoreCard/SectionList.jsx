"use client";

import { useState, useEffect, useRef } from "react";

const SectionList = ({
  sections,
  onEditSection,
  onDeleteSection,
  onAddCriteria,
  onEditCriteria,
  onDeleteCriteria,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openCriteriaMenuId, setOpenCriteriaMenuId] = useState(null);
  const menuRefs = useRef({});
  const criteriaMenuRefs = useRef({});

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

  return (
    <div className="mt-5">
      {sections.map((section) => (
        <div
          key={section.id}
          className="mb-4 border border-gray-200 rounded-md"
        >
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-t-md">
            <div className="font-medium flex-grow">{section.name}</div>
            <div className="font-semibold mr-5">0</div>

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
              {section.criteria.map((criterion) => {
                const criteriaMenuId = getCriteriaMenuId(
                  section.id,
                  criterion.id
                );
                return (
                  <div
                    key={criterion.id}
                    className="py-2 border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                  >
                    <div className="flex-grow">{criterion.name}</div>
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
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SectionList;
