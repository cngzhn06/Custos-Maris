import React from "react";
import MapIcon from "@mui/icons-material/Map";

const LSidebar = ({ ships }) => {
  const uniqueShips = Array.from(
    new Map(ships.map((ship) => [ship.mmsi, ship])).values()
  );

  return (
    <div className="w-1/5 bg-sidebar-color pt-4 text-navbar-color">
      {uniqueShips.map((ship, index) => (
        <div
          key={index}
          className="p-2 w-full border-b-2 flex justify-between items-center"
        >
          <div>
            <p className="font-bold text-xl">{ship.name}</p>
            <p className="text-l">MMSI: {ship.mmsi}</p>
            <p className="text-xs text-red-400">{ship.statusDetail}</p>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <p className="text-xs">{ship.date}</p>
            <MapIcon className="text-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LSidebar;
