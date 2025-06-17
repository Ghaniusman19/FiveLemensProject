import Button from "../ButtonComponent/Button";
import { useRef, useState } from "react";
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
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    initialData || {
      title: "",
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

  // const getAllData = async () => {
  //   try {
  //     console.log("getdata");
  //     const response = await fetch(
  //       "https://fldemo.fivelumenstest.com/api/auth/groups/all",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization:
  //             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
  //         },
  //         body: JSON.stringify(),
  //       }
  //     );
  //     console.log(response);
  //     const data = await response.json();
  //     // See response in browser console
  //     console.log("API Response:", data);
  //   } catch (error) {
  //     console.error("API Error:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (show && !initialData) {
  //     setFormData((prev) => ({ ...prev, id: generateId() }));
  //   }
  //   if (show && initialData) {
  //     setFormData({ ...initialData, id: initialData.id || generateId() });
  //   }
  // }, [show, initialData]);

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
    const handleAll = async () => {
      try {
        const response = await fetch(
          "https://fldemo.fivelumenstest.com/api/auth/groups/all",
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
        console.log(data);

        // See response in browser console
        console.log("API Response:", data);
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
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      const data = await response.json();
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
    console.log("Form Data:", formData);
    onClose();
    onSubmit(formData);
    // localStorage.setItem("scorecardData", JSON.stringify(formData));
    if (shouldNavigate) {
      navigate(`/Quality/scorecard/edit?form=${formData.title}`, {
        state: { title: formData.title },
      });
      formRef.current.reset();
    } else {
      // just close the modal
      onClose();
    }
    if (isEdit) {
      navigate("/Quality/scorecard");
      formRef.current.reset();
    }

    // try {
    //   const response = await fetch(
    //     "https://fldemo.fivelumenstest.com/api/auth/profile",
    //     {
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization:
    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
    //       },
    //       body: JSON.stringify(),
    //     }
    //   );
    //   const data = await response.json();
    //   // See response in browser console
    //   console.log("API Response:", data);
    // } catch (error) {
    //   console.error("API Error:", error);
    // }
    // try {
    //   const response = await fetch(
    //     "https://fldemo.fivelumenstest.com/api/domain-check",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization:
    //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyYzQ0MTUwMDhmNmZkMmE0MmUwNDNlOSJ9LCJpYXQiOjE3NDg5NDQxNzQsImV4cCI6MTc1MDI0MDE3NH0.79wdRiFp6Cz2Og5ud_VJG4jNoOw7iND_olYfGkusZ8Q",
    //       },
    //       body: JSON.stringify(),
    //     }
    //   );
    //   const data = await response.json();
    //   // See response in browser console
    //   console.log("API Response:", data);
    // } catch (error) {
    //   console.error("API Error:", error);
    // }
  };

  return (
    <div className="transition-all  overflow-scroll duration-300 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-max  mt-32">
        <div className="form-header flex justify-between">
          <div className="text">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
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
              id="title"
              name="title"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.title}
              onChange={handleChange}
              required
              readOnly={isView}
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
                <option value="">Select All</option>
                <option vlaue="Guatemala City 1">Guatemala City 1</option>
                <option vlaue="Guatemala City 2">Guatemala City 2</option>
                <option vlaue="Guatemala City 3">Guatemala City 3</option>
                <option vlaue="Guatemala City 4">Guatemala City 4</option>
                <option vlaue="Guatemala City 5">Guatemala City 5</option>
                <option vlaue="Guatemala City 6">Guatemala City 6</option>
              </select>
              {!formData.groups && (
                <p className="text-red-700 ml-2">this field is required</p>
              )}
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
