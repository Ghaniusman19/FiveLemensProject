import Button from "../ButtonComponent/Button";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const CoachingFormModal = ({ show, onClose, onSubmit }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    managerVisible: false,
    emailNotification: false,
    groups: "",
    allgroup: false,
  });
  const formRef = useRef(null);
  if (!show) return null;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose();
    onSubmit(formData);
    setFormData("");
    navigate("/Quality/scorecard");
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
            <label htmlFor="name" className="text-gray-950 font-semibold">
              Name :
            </label>
            <input
              id="name"
              name="name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />{" "}
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-gray-950 font-semibold"
            >
              Description :
            </label>
            <input
              id="description"
              name="description"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="allgroup" className="font-bold">
              All Groups (Apply to all new groups)
            </label>
            <input
              id="allgroup"
              name="allgroup"
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          {!isChecked && (
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
              <p className="text-red-700 ml-2">this field is required</p>
            </div>
          )}

          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="managerVisible">Visible to manager Only</label>
            <input
              id="managerVisible"
              type="checkbox"
              name="managerVisible"
              value={formData.managerVisible}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="emailNotification">Email Notification</label>
            <input
              id="emailNotification"
              type="checkbox"
              name="emailNotification"
              value={formData.emailNotification}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={onClose}
              label="Cancel"
              className=" text-gray-700 border border-gray-500 px-3 py-2 rounded-lg "
            />

            <button
              type="submit"
              className="bg-blue-700 text-white px-4 py-1 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoachingFormModal;
