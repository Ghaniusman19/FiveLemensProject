import Button from "../Buttons/Button";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScoreCardModal = ({
  show,
  onClose,
  onSubmit,
  initialData,
  isEdit,
  isView,
  shouldNavigate = true, // Default to true
  title = "Begin Coaching Session", // default title
  headerdescription = "manage scorecard settings here",
}) => {
  const [groups, setGroups] = useState([]);
  const [URL, setURL] = useState("");
  const authtoken = localStorage.getItem("token");
  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/groups/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: authtoken,
          },
        }
      );
      const data = await response.json();
      setGroups(data.data); // or setGroups(data.groups) if your API returns { groups: [...] }
    };
    fetchGroups();
    const fetchCoachingForms = async () => {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/coaching-forms/all?isActive=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: authtoken,
          },
        }
      );
      const data = await response.json();
      setCoachingForms(data.data);
    };

    fetchCoachingForms();
  }, []);
  const [coachingForms, setCoachingForms] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [showGroupDropdown, setShowGroupDropdown] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    initialData || {
      title: "",
      description: "",
      visibleToManagers: false,
      coachingPurposeOnly: false,
      groups: [],
      allgroup: false,
      evaluationType: "",
      scoringModel: "",
      coachingForm: "",
    }
  );

  const handleSelectAllGroups = (e) => {
    const checked = e.target.checked;
    setFormData((prev) => ({
      ...prev,
      groups: checked ? groups.map((g) => g._id) : [],
    }));
  };
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);
  const formRef = useRef(null);
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked, multiple, options } = e.target;

    if (multiple) {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const newVar = {
        ...formData,
        id: initialData._id, // or data._id, depending on API response
      };
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/scorecards/update/settings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authtoken,
          },
          body: JSON.stringify(newVar),
        }
      );
      console.log("My response from Add Api", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("scorecardtitle", formData.title);
    const handleAll = async () => {
      try {
        const response = await fetch(
          "https://fldemo.fivelumenstest.com/api/auth/groups/all",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: authtoken,
            },
            body: JSON.stringify(),
          }
        );
        const data = await response.json();
        console.log(" usman acha hai", data);

        // See response in browser console
        console.log("API response from get:", data);
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    handleAll();
    try {
      console.log("hello");
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/scorecards/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authtoken,
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("My response from Add Api", response);
      const result = await response.json();
      // See response in browser console
      console.log("API Response from data222:", result);
      const createdId = result?.data?._id;
      console.log(createdId);
      console.log("ye hum hazir hwe", result.data);
      setURL(createdId);
      if (shouldNavigate) {
        console.log("our url is ", URL);
        navigate(`/Quality/scorecard/edit?form=${createdId}`);
        formRef.current.reset();
      } else {
        // just close the modal
        onClose();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
    console.log("Form Data:", formData);
    onClose();
    onSubmit(formData);

    if (isEdit) {
      navigate("/Quality/scorecard");
      formRef.current.reset();
    }
  };

  const handleForm = (e) => {
    if (isEdit === true) {
      handleUpdate(e);
      onClose();
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className="transition-all  overflow-scroll duration-300 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-max mt-32">
        <div className="form-header flex justify-between">
          <div className="text">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-lg font-semibold text-gray-600">
              {" "}
              {headerdescription}{" "}
            </p>
          </div>
          <div className="btn bg-white p-3 items-start text-gray-900 rounded-full shadow-lg h-10">
            <Button label="&times;" onClick={onClose} />
          </div>
        </div>
        <hr />
        <form
          className="space-y-2 w-96 overflow-y-auto"
          onSubmit={handleForm}
          ref={formRef}
        >
          <div>
            <label htmlFor="name" className="text-gray-950 font-semibold">
              Name :
            </label>
            <input
              id="title"
              name="title"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.title}
              onChange={handleChange}
              required
              readOnly={isView}
              placeholder="Enter Scorecard Name here ...."
            />
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
              readOnly={isView}
              placeholder="Enter Scorecard Description here ...."
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
              <label htmlFor="group" className="text-gray-950 font-semibold">
                Groups :
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowGroupDropdown(!showGroupDropdown)}
                  className="w-full border border-gray-300 p-2 rounded text-left bg-white flex justify-between items-center"
                >
                  <span className="overflow-hidden ">
                    {Array.isArray(formData.groups) &&
                    formData.groups.length > 0
                      ? groups
                          .filter((group) =>
                            formData.groups.includes(group._id)
                          )
                          .map((group) => group.title)
                          .join(", ")
                      : "Select Groups"}
                  </span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${
                      showGroupDropdown ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showGroupDropdown && (
                  <div className="absolute z-10 bg-white border border-gray-300 mt-1 rounded p-2 w-full max-h-48 overflow-y-auto">
                    <label className="flex items-center space-x-2 p-1">
                      <input
                        type="checkbox"
                        checked={
                          formData.groups.length === groups.length &&
                          groups.length > 0
                        }
                        onChange={handleSelectAllGroups}
                      />
                      <span>Select All</span>
                    </label>
                    {groups.map((group) => (
                      <label
                        key={group._id}
                        className="flex items-center space-x-2 p-1"
                      >
                        <input
                          type="checkbox"
                          checked={formData.groups.includes(group._id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setFormData((prev) => ({
                              ...prev,
                              groups: checked
                                ? [...prev.groups, group._id]
                                : prev.groups.filter((id) => id !== group._id),
                            }));
                          }}
                        />
                        <span>{group.title}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
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
              <option value="" className="text-gray-600">
                Manual
              </option>
              <option value="manual">Manual</option>
              <option value="ai">AI</option>
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
              <option value="weighted">Weighted</option>
              <option value="equal">Equall</option>
              <option value="selective audit">Selective Audit </option>
              <option value="audit">Audit</option>
            </select>
          </div>

          {/* COACHING FORM */}
          <div>
            <label
              htmlFor="coachingForm"
              className="text-gray-950 font-semibold"
            >
              Coaching Form :
            </label>
            <select
              id="coachingForm"
              name="coachingForm"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.coachingForm}
              onChange={handleChange}
              required
            >
              <option value="" className="text-gray-600">
                Coaching Form
              </option>
              {coachingForms.map((form) => (
                <option key={form._id} value={form._id}>
                  {form.title}
                </option>
              ))}
            </select>
          </div>
          <p className="text-gray-600">Additional Setting</p>
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="visibleToManagers">Visible to manager Only</label>
            <input
              id="visibleToManagers"
              type="checkbox"
              name="visibleToManagers"
              value={formData.visibleToManagers}
              onChange={handleChange}
            />
          </div>
          {formData.visibleToManagers === false ? (
            <span className="text-red-600 font-normal">
              {" "}
              this field is required
            </span>
          ) : (
            ""
          )}
          <div className="flex justify-between gap-2 w-full">
            <label htmlFor="coachingPurposeOnly">Email Notification</label>
            <input
              id="coachingPurposeOnly"
              type="checkbox"
              name="coachingPurposeOnly"
              value={formData.coachingPurposeOnly}
              onChange={handleChange}
            />
          </div>
          {formData.coachingPurposeOnly === false ? (
            <span className="text-red-600"> this field is required</span>
          ) : (
            ""
          )}
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
              {isEdit ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScoreCardModal;
