import React from "react";
import Container from "./Container";
const Header = () => {
  return (
    <div className="header bg-[#181818] min-h-[66px] flex items-center ">
      <Container>
        <header className="text-white flex justify-between items-center ">
          <div className="logo">
            <img src="src/assets/fivelumens-logo.svg" alt="header Logo " />
          </div>
          <div className="user-description flex justify-between items-center">
            <div className="user-email">
              <p className="text-[15px] text-right"> Lester Tester</p>
              <p className="text-[10px]">fldemo@fivelumens.com</p>
            </div>
            <div className="user-img rounder-full w-10 h-10">
              <img src="src/assets/lester-tester-img.png" alt="user Image " />
            </div>
          </div>
        </header>
      </Container>
    </div>
  );
};

export default Header;
