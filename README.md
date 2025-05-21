# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


 //  /// /// //react form  //// //// /// /// //

import React, { useState } from 'react';

const ProfessionalFormDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [sections, setSections] = useState([]);

  // Forms configuration (different for each button)
  const forms = {
    form1: { title: "Personal Info", fields: ["Name", "Email"] },
    form2: { title: "Address", fields: ["Street", "City"] },
    form3: { title: "Account", fields: ["Username", "Password"] },
    form4: { title: "Preferences", fields: ["Theme", "Language"] },
    form5: { title: "Feedback", fields: ["Message", "Rating"] },
  };

  const handleButtonClick = (formKey) => {
    setIsDropdownOpen(false); // Close dropdown
    setActiveModal(formKey);  // Open specific modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSection = {
      id: Date.now(),
      title: forms[activeModal].title,
      data: formData,
    };
    setSections([...sections, newSection]);
    setActiveModal(null); // Close modal
    setFormData({});     // Reset form data
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleEditSection = (id) => {
    const sectionToEdit = sections.find((section) => section.id === id);
    setFormData(sectionToEdit.data);
    setActiveModal(Object.keys(forms).find(key => forms[key].title === sectionToEdit.title));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Dropdown Trigger Button */}
      <div className="relative inline-block">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Open Forms Dropdown
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
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
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-bold mb-4">{forms[activeModal].title}</h2>
            <form onSubmit={handleSubmit}>
              {forms[activeModal].fields.map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 mb-2">{field}:</label>
                  <input
                    type="text"
                    name={field.toLowerCase()}
                    onChange={handleInputChange}
                    value={formData[field.toLowerCase()] || ""}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
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
      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {section.title}: {Object.values(section.data).join(", ")}
              </h3>
              <div className="relative">
                <button
                  onClick={() => document.getElementById(dropdown-${section.id}).classList.toggle("hidden")}
                  className="p-1 rounded hover:bg-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                <div
                  id={dropdown-${section.id}}
                  className="hidden absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10"
                >
                  <button
                    onClick={() => handleEditSection(section.id)}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>d
  );
};

export default ProfessionalFormDropdown;




//react second form

import React, { useState } from 'react';

const DropdownWithModals = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});

  // Forms configuration (different for each button)
  const forms = {
    form1: { title: "Form 1", fields: ["Name", "Email"] },
    form2: { title: "Form 2", fields: ["Address", "Phone"] },
    form3: { title: "Form 3", fields: ["Username", "Password"] },
    form4: { title: "Form 4", fields: ["Age", "Gender"] },
    form5: { title: "Form 5", fields: ["Feedback", "Rating"] },
  };

  const handleButtonClick = (formKey) => {
    setIsDropdownOpen(false); // Close dropdown
    setActiveModal(formKey);  // Open specific modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data for", activeModal, ":", formData);
    // Add API call here (e.g., axios.post('/submit', formData))
    setActiveModal(null); // Close modal
    setFormData({});     // Reset form data
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="dropdown-container" style={{ position: "relative" }}>
      {/* Dropdown Trigger Button */}
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Open Dropdown
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="dropdown-menu" style={{ 
          position: "absolute", 
          top: "100%", 
          left: 0, 
          background: "white", 
          border: "1px solid #ccc",
          zIndex: 1000,
        }}>
          {Object.keys(forms).map((formKey) => (
            <button
              key={formKey}
              onClick={() => handleButtonClick(formKey)}
              style={{ display: "block", width: "100%" }}
            >
              {forms[formKey].title}
            </button>
          ))}
        </div>
      )}

      {/* Modal for Active Form */}
      {activeModal && (
        <div className="modal" style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "white",
          padding: "20px",
          border: "1px solid #ccc",
          zIndex: 1001,
        }}>
          <h2>{forms[activeModal].title}</h2>
          <form onSubmit={handleSubmit}>
            {forms[activeModal].fields.map((field) => (
              <div key={field} style={{ margin: "10px 0" }}>
                <label>{field}:</label>
                <input
                  type="text"
                  name={field.toLowerCase()}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
            <button type="submit">Submit</button>
            <button 
              type="button" 
              onClick={() => setActiveModal(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DropdownWithModals;