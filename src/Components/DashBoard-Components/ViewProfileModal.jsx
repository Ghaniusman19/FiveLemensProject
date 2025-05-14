const ViewProfileModal = ({ showProfile, onClose, onSubmit }) => {
  if (!showProfile) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const remainderData = {
      name: formData.get("reminder"),
      description: formData.get("description"),
      date: formData.get("date"),
    };
    console.log("Submitted Reminder:", remainderData); // console output
    onSubmit(remainderData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <hr />
        <form onSubmit={handleSubmit} className="space-y-2">
          <label className="text-[gray]" htmlFor="name">
            Profile
          </label>
          <input
            type="text"
            name="reminder"
            id="name"
            placeholder="Enter name"
            className="w-full border border-gray-300 p-2 rounded"
            required
            autoComplete="off"
          />
          <label className="text-[gray]" htmlFor="description">
            Description :
          </label>
          <textarea
            type="textarea"
            name="description"
            id="description"
            maxLength={20}
            placeholder="Enter Description"
            className="w-full border border-gray-300 p-2 rounded"
            required
            autoComplete="off"
          ></textarea>
          <label className="text-[gray]" htmlFor="date">
            Date :
          </label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Enter name"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-900 bg-gray-300  px-4 py-1 rounded"
            >
              Cancel
            </button>
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

export default ViewProfileModal;
