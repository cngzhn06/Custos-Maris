import React from "react";

const RSideBar = ({ ship }) => {
  return (
    <div className="w-1/5 bg-sidebar-color p-6 text-white flex flex-col justify-between">
      {/* Ship Details */}
      <div>
        <p className="text-navbar-color text-xl font-bold mb-2">
          {ship.name || "Ship Name"}
        </p>
        <p className="text-navbar-color text-sm mb-6">
          {ship.shipType || "Kargo Gemisi"}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-navbar-color text-left mt-1 ml-1">İMO</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.imo || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left ml-1 mt-1">MMSI</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.mmsi || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left mt-1 ml-1">SPEED</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.speed || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left ml-1 mt-1">BASLANGIC</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.departurePort || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left mt-1 ml-1">LON</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.lat || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left ml-1 mt-1">LAT</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.lat || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left mt-1 ml-1">HEADING</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.heading || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-navbar-color text-left ml-1 mt-1">COURSE</p>
            <p className="bg-navbar-color text-sidebar-color text-sm text-center py-2 rounded-xl font-bold">
              {ship.course || "N/A"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button className="bg-[#4A90E2] hover:bg-[#357ABD] text-white font-bold py-2 px-4 rounded w-full">
            Son 1 Saat
          </button>
          <button className="bg-[#E94E77] hover:bg-[#D13A5A] text-white font-bold py-2 px-4 rounded w-full">
            Tüm Hareketler
          </button>
        </div>
      </div>


      <div
        className={"text-center py-2 rounded-md font-bold bg-navbar-color text-sidebar-color"}
      >
        <p>{ship.anomalyStatus || "ANORMALİ YOK"}</p>
      </div>
    </div>
  );
};

export default RSideBar;
