import React from "react";

const RSideBar = ({ ship }) => {
  return (
    <div className="w-1/5 bg-sidebar-color p-4 text-white">
      <p className="text-lg font-bold mb-4">Ship Details</p>
      <p><strong>Type:</strong> {ship.shipType}</p>
      <p><strong>Speed:</strong> {ship.speed} knot</p>
      <p><strong>Location:</strong> Lat: {ship.lat}, Long: {ship.lon}</p>
      <p><strong>Course:</strong> {ship.course}°</p>
      <p><strong>Departure Port:</strong> {ship.departurePort}</p>
      <p><strong>IMO:</strong> {ship.imo}</p>
      <p><strong>MMSI:</strong> {ship.mmsi}</p>
      <p><strong>Timestamp:</strong> {ship.timestamp}</p>
    </div>
  );
};

export default RSideBar;
