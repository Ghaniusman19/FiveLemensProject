"use client"

import { useState, useEffect, useRef } from "react"

const EditCriteriaModal = ({ criteria, onClose, onSave }) => {
  const [criteriaName, setCriteriaName] = useState(criteria.name)
  const modalRef = useRef(null)

  useEffect(() => {
    setCriteriaName(criteria.name)
  }, [criteria])

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (criteriaName.trim()) {
      onSave(criteriaName)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl" ref={modalRef}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Edit Criteria</h2>
          <button className="text-2xl font-bold leading-none" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-5">
            <label htmlFor="criteria-name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="criteria-name"
              type="text"
              value={criteriaName}
              onChange={(e) => setCriteriaName(e.target.value)}
              placeholder="Enter criteria name"
              required
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm"
            />
          </div>
          <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
            <button type="button" className="px-4 py-2 border border-gray-300 rounded-md font-medium" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCriteriaModal
