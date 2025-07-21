import Button from "../Buttons/Button";
import { useState, useRef } from "react";
const AddSectionModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    groups: "",
    teams: "",
    users: "",
    coaching: "",
  });
  const formRef = useRef(null);
  if (!show) return null;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose();
    onSubmit(formData);
    setFormData("");
    formRef.current.reset();
  };

  return (
    <div className="transition-all duration-300 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-max">
        <div className="form-header flex justify-between">
          <div className="text">
            <h2 className="text-xl font-semibold mb-4">
              Begin Coaching Session
            </h2>
            <p>Select the criteria below to begin a coaching session</p>
          </div>
          <div className="btn bg-white p-3 items-start text-gray-900 rounded-full shadow-lg h-10">
            <Button label="&times;" onClick={onClose} />
          </div>
        </div>
        <hr />
        <form className="space-y-2" onSubmit={handleSubmit} ref={formRef}>
          <div>
            <label htmlFor="groups" className="text-gray-950 font-semibold">
              Groups :
            </label>
            <select
              id="groups"
              name="groups"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.groups}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Select Groups
              </option>
              <option>Select All</option>
              <option>Guatemala City</option>
              <option>Guatemala </option>
              <option>Guatemala 1</option>
              <option>Guatemala 2</option>
              <option>Guatemala 3</option>
              <option>Guatemala 4</option>
            </select>
          </div>
          <div>
            <label htmlFor="teams" className="text-gray-950 font-semibold">
              Teams :
            </label>
            <select
              id="teams"
              name="teams"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.teams}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Select Teams
              </option>
              <option>Select All</option>
              <option>Customer Care 1</option>
              <option>Customer Care 2</option>
              <option>Customer Care 3</option>
              <option>Customer Care 4</option>
            </select>
          </div>
          <div>
            <label htmlFor="users" className="text-gray-950 font-semibold">
              Users :
            </label>
            <select
              id="users"
              name="users"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.users}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Select Users
              </option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div>
            <label htmlFor="coaching" className="text-gray-950 font-semibold">
              Coaching Form :
            </label>
            <select
              id="coaching"
              name="coaching"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.coaching}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Select Coaching Form
              </option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              label="Cancel"
              className="bg-blue-700 text-white px-3 py-2 rounded-lg"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSectionModal;
