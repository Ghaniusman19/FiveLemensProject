import { useState } from "react";
const Users = () => {
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
    setActiveModal(formKey); // Open specific modal
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted data for", activeModal, ":", formData);
    setActiveModal(null); // Close modal
    setFormData({}); // Reset form data
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
        <div
          className="dropdown-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "white",
            border: "1px solid #ccc",
            zIndex: 1000,
          }}
        >
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
        <div
          className="modal"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid #ccc",
            zIndex: 1001,
          }}
        >
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
              style={{ marginLeft:"10px"}}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
