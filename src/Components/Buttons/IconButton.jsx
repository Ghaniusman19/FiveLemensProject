// ✅ IconButton.jsx
import React from "react";

const IconButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="p-2">
      <span className="text-xl">⋮</span>
    </button>
  );
};

export default IconButton;