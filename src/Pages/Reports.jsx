import React, { useState } from "react";

function Reports() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="tags-input-container flex border border-gray-300 rounded-lg p-2 bg-slate-700">
      {tags.map((tag, index) => (
        <div key={index} className="tag-item border border-gray-400 rounded-full px-3 py-1 mr-2 mb-2 flex items-center bg-slate-600">
          <span>{tag}</span>
          <span className="close-button cursor-pointer" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        className="bg-slate-600"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags..."
      />
    </div>
  );
}

export default Reports;
