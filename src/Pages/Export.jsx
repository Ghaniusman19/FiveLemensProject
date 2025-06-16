import React, { useState, useEffect } from "react";

const Export = () => {
  // Load array from localStorage on first render
  const [array, setArray] = useState(() => {
    const saved = localStorage.getItem("myArray");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({ name: "", password: "" });

  // Save array to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("myArray", JSON.stringify(array));
  }, [array]);

  const closeList = (id) => {
    const updatedArray = array.filter((arr) => arr.id !== id);
    setArray(updatedArray);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      ...formData,
      id: Date.now(),
    };
    const updatedArray = [...array, newItem];
    setArray(updatedArray);
    setFormData({ name: "", password: "" });
  };

  return (
    <div>
      <ul className="p-3 bg-slate-400 ">
        {array.map((arr) => (
          <li key={arr.id} className="p-2 bg-slate-200 m-2 rounded-md">
            {arr.id} the names of the fruits are {arr.name}
            <button
              className="p-2 bg-slate-300"
              onClick={() => closeList(arr.id)}
            >
              close
            </button>
          </li>
        ))}
      </ul>

      <form
        onSubmit={formSubmit}
        className="flex flex-col justify-center"
      >
        <div>
          <label htmlFor="name">User Name :</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputs}
            className="border border-slate-900"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">User Password :</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputs}
            className="border border-slate-900"
          />
        </div>

        <button type="submit">Submit </button>
      </form>
    </div>
  );
};

export default Export;