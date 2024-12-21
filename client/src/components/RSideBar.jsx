import React from "react";

const RSideBar = ({ ship, onShowFullRoute, showFullRoute }) => {
  if (!ship) {
    return null; // Eğer bir gemi seçilmediyse, hiçbir şey render edilmesin
  }

  const handleFullRouteClick = () => {
    if (showFullRoute === "fullRoute") {
      onShowFullRoute(null); // Tüm rotayı gizle
    } else {
      onShowFullRoute("fullRoute"); // Tüm rotayı göster
    }
  };

  const handleLastHourRouteClick = () => {
    if (showFullRoute === "lastHourRoute") {
      onShowFullRoute(null); // Son 1 saati gizle
    } else {
      onShowFullRoute("lastHourRoute"); // Son 1 saati göster
    }
  };

  return (
    <div className="w-1/5 bg-sidebar-color p-6 text-white flex flex-col justify-between">
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
        <div className="flex flex-col gap-4 mt-6 items-center">
          <button
            className={`${
              showFullRoute === "lastHourRoute"
                ? "bg-[#5b6e2c] hover:bg-[#4A702D]"
                : "bg-navbar-color hover:bg-[#b8ae79] text-sidebar-color"
            } font-bold py-3 px-6 rounded-lg w-64 transition duration-300 shadow-md`}
            onClick={handleLastHourRouteClick}
          >
            Son 1 Saat
          </button>
          <button
            className={`${
              showFullRoute === "fullRoute"
                ? "bg-[#5b6e2c] hover:bg-[#4A702D]"
                : "bg-navbar-color hover:bg-[#b8ae79] text-sidebar-color"
            } font-bold py-3 px-6 rounded-lg w-64 transition duration-300 shadow-md`}
            onClick={handleFullRouteClick}
          >
            {showFullRoute === "fullRoute" ? "Rota Gizle" : "Tüm Hareketler"}
          </button>
        </div>
      </div>

      <div
        className={
          "text-center py-2 rounded-md font-bold bg-navbar-color text-sidebar-color"
        }
      >
        <p>{ship.anomalyStatus || "ANORMALİ YOK"}</p>
      </div>
    </div>
  );
};

export default RSideBar;
