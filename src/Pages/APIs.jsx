import React, { useState } from "react";

const APIs = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("itemIndex"), 10);
    if (draggedIndex === dropIndex) return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(dropIndex, 0, draggedItem);

    setItems(updatedItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          className="draggable-item p-3 mb-3 bg-gray-200 rounded shadow-sm cursor-move border border-gray-300"
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default APIs;
