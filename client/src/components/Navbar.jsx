import React from "react";
import LiveTvIcon from "@mui/icons-material/LiveTv";

const Navbar = () => {
  return (
    <>
      <nav className="p-4 fixed w-full z-12 top-0 bg-navbar-color flex items-center justify-between">
        <div className="text-sidebar-color font-bold text-xl flex items-center text-center space-x-2">
          <LiveTvIcon className="text-xl"/>
          <span className="text-2xl">Canlı</span>
        </div>

        <div className="flex-1 flex justify-center items-center">
          <img
            src="logo.png"
            alt="Custos Maris Logo"
            className="h-12 w-36"
          />
        </div>

        <div className="text-black"></div>
      </nav>
    </>
  );
};

export default Navbar;
