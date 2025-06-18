import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import ProfileMenu from "./DashBoard-Components/ProfileMenu";
const Header = () => {
  const [profileMenu, setprofileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const toggleProfile = () => {
    setprofileMenu((open) => !open);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setprofileMenu(false); // ✅ call close handler if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenu]);

  return (
    <div className="header bg-[#181818] min-h-[66px] flex items-center ">
      <Container>
        <header className="text-white flex justify-between items-center ">
          <div className="logo">
            <img src="/src/assets/fivelumens-logo.svg" alt="header Logo " />
          </div>
          <div className="user-description flex justify-between items-center cursor-pointer">
            <div className="user-email">
              <p className="text-[15px] text-right"> Lester Tester</p>
              <p className="text-[10px]">fldemo@fivelumens.com</p>
            </div>
            <div
              className="user-img rounder-full relative w-10 h-10"
              onClick={toggleProfile}
            >
              <img src="/src/assets/lester-tester-img.png" alt="user Image " />
              {profileMenu && (
                <div
                  ref={profileMenuRef}
                  className="profile-menu absolute shadow-xl z-10 top-12 right-0  bg-white rounded"
                >
                  <ProfileMenu />
                </div>
              )}
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default Header;
