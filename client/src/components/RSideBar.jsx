import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const RSideBar = ({
  ship,
  onShowFullRoute,
  showFullRoute,
  isOpen,
  onToggle,
}) => {
  if (!ship) {
    return null;
  }

  const handleFullRouteClick = () => {
    if (showFullRoute === "fullRoute") {
      onShowFullRoute(null);
    } else {
      onShowFullRoute("fullRoute");
    }
  };

  const handleLastHourRouteClick = () => {
    if (showFullRoute === "lastHourRoute") {
      onShowFullRoute(null);
    } else {
      onShowFullRoute("lastHourRoute");
    }
  };

  return (
    <div className={`${isOpen ? 'w-72' : 'w-12'} bg-sidebar-color h-[calc(100vh-4rem)] flex relative transition-all duration-300`}>
      <button
        onClick={onToggle}
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-sidebar-color text-navbar-color hover:bg-navbar-color hover:text-sidebar-color transition-colors rounded-full p-1 shadow-lg z-10"
      >
        {isOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>

      {isOpen ? (
        <div className="w-full p-6 text-white flex flex-col justify-between overflow-y-auto">
          <div>
            <p className="text-navbar-color text-2xl font-bold mb-2 text-center">
              {ship.name || "Ship Name"}
            </p>
            <p className="text-navbar-color text-sm mb-6 text-center">
              {ship.shipType || "Kargo Gemisi"}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">İMO</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.imo || "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">MMSI</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.mmsi || "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">HIZ</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.speed ? `${ship.speed} knot` : "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">BAŞLANGIÇ</p>
                <p className="text-sidebar-color text-lg font-bold truncate">
                  {ship.departurePort || "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">ENLEM</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.lat ? `${ship.lat.toFixed(4)}°` : "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">BOYLAM</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.lon ? `${ship.lon.toFixed(4)}°` : "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">Baş Açısı</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.heading !== undefined && ship.heading !== null
                    ? `${ship.heading}°`
                    : "N/A"}
                </p>
              </div>
              <div className="bg-[#1a2634] p-3 rounded-xl shadow-lg">
                <p className="text-navbar-color text-sm font-medium mb-1">Rota</p>
                <p className="text-sidebar-color text-lg font-bold">
                  {ship.course !== undefined && ship.course !== null
                    ? `${ship.course}°`
                    : "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button
                className={`${
                  showFullRoute === "lastHourRoute"
                    ? "bg-[#5b6e2c] hover:bg-[#4A702D]"
                    : "bg-[#4A702D] hover:bg-[#5b6e2c]"
                } text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 shadow-lg`}
                onClick={handleLastHourRouteClick}
              >
                {showFullRoute === "lastHourRoute" ? "Rota Gizle" : "Son 1 Saat"}
              </button>
              <button
                className={`${
                  showFullRoute === "fullRoute"
                    ? "bg-[#5b6e2c] hover:bg-[#4A702D]"
                    : "bg-[#4A702D] hover:bg-[#5b6e2c]"
                } text-white font-bold py-3 px-6 rounded-xl w-full transition duration-300 shadow-lg`}
                onClick={handleFullRouteClick}
              >
                {showFullRoute === "fullRoute" ? "Rota Gizle" : "Tüm Hareketler"}
              </button>
            </div>
          </div>

          <div className="mt-6 text-center py-3 rounded-xl font-bold bg-[#1a2634] text-sidebar-color shadow-lg">
            <p>{ship.anomalyStatus || "ANORMALİ YOK"}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          
        </div>
      )}
    </div>
  );
};

export default RSideBar;
