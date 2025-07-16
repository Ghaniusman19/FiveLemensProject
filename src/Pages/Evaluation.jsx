
import React, { useState } from "react";

// Custom Button Component
const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };
  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  id,
}) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
};

// Custom Checkbox Component
const Checkbox = ({ checked, onChange, id }) => {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
  );
};

// Custom Label Component
const Label = ({ children, htmlFor, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
    </label>
  );
};

// Custom Dropdown Component
const DropdownMenu = ({ children, isOpen, onToggle }) => {
  return (
    <div className="relative inline-block text-left">
      {React.Children.map(children, (child) => {
        if (child.type === DropdownMenuTrigger) {
          return React.cloneElement(child, { onClick: onToggle });
        }
        if (child.type === DropdownMenuContent) {
          return isOpen ? child : null;
        }
        return child;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, { onClick });
};

const DropdownMenuContent = ({ children, className = "" }) => {
  return (
    <div
      className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 ${className}`}
    >
      <div className="py-1">{children}</div>
    </div>
  );
};

const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
    >
      {children}
    </button>
  );
};

// Icons (simple SVG components)
const ChevronDownIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const XIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
    />
  </svg>
);

const TagIcon = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

function Evaluation() {
  // Main state management
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Tag management for tag-enabled modals
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  // Modal configuration - defines what each modal contains
  const modalConfig = {
    user: {
      title: "Add New User",
      fields: ["name", "email", "role"],
      hasCheckbox: true,
      checkboxLabel: "Send welcome email",
      hasTags: false,
    },
    project: {
      title: "Create Project",
      fields: ["projectName", "description", "deadline"],
      hasCheckbox: true,
      checkboxLabel: "Make project public",
      hasTags: false,
    },
    tags: {
      title: "Manage Tags",
      fields: ["tagCategory", "description"],
      hasCheckbox: true,
      checkboxLabel: "Enable auto-suggestions",
      hasTags: true,
    },
    categories: {
      title: "Add Category",
      fields: ["categoryName", "color", "priority"],
      hasCheckbox: true,
      checkboxLabel: "Set as default category",
      hasTags: true,
    },
    settings: {
      title: "System Settings",
      fields: ["settingName", "value", "environment"],
      hasCheckbox: true,
      checkboxLabel: "Apply to all users",
      hasTags: false,
    },
  };

  // Handle opening modals
  const openModal = (type) => {
    setActiveModal(type);
    setFormData({});
    setTags([]);
    setTagInput("");
    setDropdownOpen(false);
  };

  // Handle closing modals
  const closeModal = () => {
    setActiveModal(null);
    setFormData({});
    setTags([]);
    setTagInput("");
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      checkboxValue: checked,
    }));
  };

  // Tag management functions
  const addTag = () => {
    if (tagInput.trim() && !tags.find((tag) => tag.name === tagInput.trim())) {
      const newTag = {
        id: Date.now().toString(),
        name: tagInput.trim(),
      };
      setTags((prev) => [...prev, newTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagId) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  // Handle form submission with FormData
  const handleSubmit = () => {
    const config = activeModal ? modalConfig[activeModal] : null;
    if (!config) return;

    // Create FormData object
    const formDataObj = new FormData();

    // Add modal type
    formDataObj.append("type", activeModal || "");

    // Add all form fields
    config.fields.forEach((field) => {
      const value = formData[field] || "";
      formDataObj.append(field, value);
    });

    // Add checkbox value
    if (config.hasCheckbox) {
      formDataObj.append(
        "checkboxValue",
        formData.checkboxValue ? "true" : "false"
      );
      formDataObj.append("checkboxLabel", config.checkboxLabel);
    }

    // Add tags if modal supports them
    if (config.hasTags && tags.length > 0) {
      // Add tags as JSON string
      formDataObj.append("tags", JSON.stringify(tags));
      formDataObj.append("tagCount", tags.length.toString());
    }

    // Add timestamp
    formDataObj.append("timestamp", new Date().toISOString());

    // Log FormData contents (for debugging)
    console.log("FormData contents:");
    for (const [key, value] of formDataObj.entries()) {
      console.log(`${key}: ${value}`);
    }

    // Send FormData to API
    sendFormData(formDataObj);
    console.log(formDataObj)

    closeModal();
  };

  // Function to send FormData to your API
  const sendFormData = async (formDataObj) => {
    try {
      // Example API call with FormData
      const response = await fetch("/api/submit-form", {
        method: "POST",
        body: formDataObj, // Don't set Content-Type header - browser will set it automatically
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        alert("Form submitted successfully!");
        // Handle success (show toast, update UI, etc.)
      } else {
        console.error("Error:", response.statusText);
        alert("Error submitting form");
        // Handle error
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error occurred");
      // Handle network error
    }
  };

  // Get current modal configuration
  const currentConfig = activeModal ? modalConfig[activeModal] : null;

  // Handle key press for tag input
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dropdown Modal System
        </h1>

        {/* Main Dropdown Button */}
        <DropdownMenu
          isOpen={dropdownOpen}
          onToggle={() => setDropdownOpen(!dropdownOpen)}
        >
          <DropdownMenuTrigger>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-6 py-3 text-lg bg-transparent"
            >
              Actions Menu
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => openModal("user")}>
               Add New User
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openModal("project")}>
               Create Project
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openModal("tags")}>
               Manage Tags
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openModal("categories")}>
               Add Category
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openModal("settings")}>
               System Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Modal Overlay */}
        {activeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentConfig?.title}
                </h2>
                <Button variant="ghost" size="icon" onClick={closeModal}>
                  <XIcon />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-4">
                {/* Regular Input Fields */}
                {currentConfig?.fields.map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>
                      {field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Input
                      id={field}
                      type={
                        field.includes("email")
                          ? "email"
                          : field.includes("deadline")
                          ? "date"
                          : "text"
                      }
                      placeholder={`Enter ${field.toLowerCase()}`}
                      value={formData[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  </div>
                ))}

                {/* Checkbox */}
                {currentConfig?.hasCheckbox && (
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="checkbox"
                      checked={formData.checkboxValue || false}
                      onChange={handleCheckboxChange}
                    />
                    <Label htmlFor="checkbox">
                      {currentConfig.checkboxLabel}
                    </Label>
                  </div>
                )}

                {/* Tag Management Section */}
                {currentConfig?.hasTags && (
                  <div className="space-y-3 pt-4 border-t">
                    <Label>Tags</Label>

                    {/* Tag Input - Only show if checkbox is checked */}
                    {formData.checkboxValue && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a tag"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          size="icon"
                          variant="outline"
                        >
                          <PlusIcon />
                        </Button>
                      </div>
                    )}

                    {/* Display Tags */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <div
                            key={tag.id}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                          >
                            <TagIcon />
                            {tag.name}
                            <button
                              onClick={() => removeTag(tag.id)}
                              className="ml-1 hover:text-blue-600 focus:outline-none"
                            >
                              <XIcon />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Conditional Message */}
                    {!formData.checkboxValue && (
                      <p className="text-sm text-gray-500 italic">
                        Enable "{currentConfig.checkboxLabel}" to add tags
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Add</Button>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Current State (for debugging):</h3>
          <div className="space-y-2">
            <div>
              <strong>Form Data:</strong>
              <pre className="text-sm text-gray-600 overflow-x-auto">
                {JSON.stringify({ activeModal, formData, tags }, null, 2)}
              </pre>
            </div>
            <div className="text-sm text-gray-500">
              <strong>Note:</strong> On submit, this will be converted to
              FormData object for API submission
            </div>
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {dropdownOpen && (
          <div
            className="fixed inset-0 z-0"
            onClick={() => setDropdownOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Evaluation;
