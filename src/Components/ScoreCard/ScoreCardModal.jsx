import Button from "../ButtonComponent/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ScoreCardModal = ({ show, onClose, onSubmit, initialData, isEdit }) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      description: "",
      managerVisible: false,
      emailNotification: false,
      groups: "",
      allgroup: false,
      evaluationType: "",
      scoringModel: "",
      coachingform: "",
    }
  );
  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const formRef = useRef(null);
  if (!show) return null;
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    onClose();
    onSubmit(formData);
    localStorage.setItem("scorecardData", JSON.stringify(formData));

    if (!isEdit) {
      navigate("/Quality/scorecard/edit", { state: { name: formData.name } });
      formRef.current.reset();
    }

    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/scorecards/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/profile",
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
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/domain-check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(),
        }
      );
      const data = await response.json();
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="transition-all  overflow-scroll duration-300 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-max  mt-32">
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
            <textarea
              rows="4"
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
              {!formData.groups && (
                <p className="text-red-700 ml-2">this field is required</p>
              )}{" "}
            </div>
          )}

          <div>
            <label
              htmlFor="evaluationType"
              className="text-gray-950 font-semibold"
            >
              Evaluation Type :
            </label>
            <select
              id="evaluationType"
              name="evaluationType"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.evaluationType}
              onChange={handleChange}
              required
            >
              <option className="text-gray-600">Manual</option>
              <option>Manual</option>
              <option>AI</option>
            </select>
          </div>
          {/* SCORING MODEL INPUTS */}
          <div>
            <label
              htmlFor="scoringModel"
              className="text-gray-950 font-semibold"
            >
              Scoring Model :
            </label>
            <select
              id="scoringModel"
              name="scoringModel"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.scoringModel}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                select sccoring model
              </option>
              <option>Weighted</option>
              <option>Equall</option>
              <option>Selective Audit </option>
              <option>Audit</option>
            </select>
          </div>

          {/* COACHING FORM */}
          <div>
            <label
              htmlFor="coachingform"
              className="text-gray-950 font-semibold"
            >
              Coaching Form :
            </label>
            <select
              id="coachingform"
              name="coachingform"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.coachingform}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Coaching Form
              </option>
              <option> Weekly Performance View</option>
              <option>One to one</option>
            </select>
          </div>
          <p className="text-gray-600">Additional Setting</p>
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
              // onClick={AddData}
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreCardModal;
