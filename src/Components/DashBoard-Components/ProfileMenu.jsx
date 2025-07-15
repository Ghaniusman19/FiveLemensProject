import React from "react";
import ViewProfileModal from "./ViewProfileModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileMenu = () => {
  const [showProfileModal, setshowProfileModal] = useState(false);
  const authToken = localStorage.getItem("token");
  // const [reminders, setReminders] = useState([]);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/domain-check",
        {
          method: "POST",
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfile = async () => {
    setshowProfileModal(true);
    try {
      const response = await fetch(
        "https://fldemo.fivelumenstest.com/api/auth/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: authToken,
          },
        }
      );
      const data = await response.json();
      // See response in browser console
      console.log("API Response:", data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSubmit = () => {
    // setReminders((prev) => [...prev, newReminder]);
    console.log("submitted");
  };
  return (
    <div className="profile__menu min-w-max p-3 text-[#344054]">
      <div className="personal-info flex gap-4 justify-between py-2">
        <div className="avatar ">
          <img
            src="src/assets/lester-tester-img.png"
            className="w-10 h-10 rounded-full"
            alt="Lester Image"
          />
        </div>
        <div className="">
          <p className="text-[black]">Lester Tester</p>
          <p className="text-[gray] text-xs">fldemo@fivelumens.com</p>
        </div>
      </div>
      <hr />

      <div className="second flex flex-col gap-2 py-4 text-[#344054]">
        <div className="">
          <button onClick={handleProfile}> View Profile</button>
        </div>

        <ViewProfileModal
          showProfile={showProfileModal}
          onClose={() => setshowProfileModal(false)}
          onSubmit={handleSubmit}
        />
        <div>Reset Password</div>
        <div> Switch to Training View</div>
      </div>

      <hr />
      <div className="third py-2">
        <div>
          <p> Support</p>
        </div>
      </div>
      <hr />
      <div className="logout py-2">
        <div>
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
