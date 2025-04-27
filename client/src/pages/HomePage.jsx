import React, { useEffect, useState } from "react";
import MapWithBounds from "../components/MapCom";
import Navbar from "../components/Navbar";
import LSidebar from "../components/LSidebar";
import RSideBar from "../components/RSideBar";

const HomePage = () => {
  const [shipList, setShipList] = useState([]);
  const [filteredShips, setFilteredShips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShip, setSelectedShip] = useState(null);
  const [showFullRoute, setShowFullRoute] = useState(null);

  const handleFullRouteToggle = (mode) => {
    setShowFullRoute(mode);
  };

  useEffect(() => {
    const fetchShipsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/messages");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const formattedShips = data.map((ship) => ({
          shipId: ship.SHIP_ID,
          name: ship.NAME || "Unknown Ship",
          shipType: ship.SHIPTYPE,
          speed: ship.SPEED,
          lon: ship.LON,
          lat: ship.LAT,
          course: ship.COURSE,
          heading: ship.HEADING,
          timestamp: ship.TIMESTAMP,
          departurePort: ship.DEPARTURE_PORT_NAME,
          reportedDraught: ship.REPORTED_DRAUGHT,
          tripId: ship.TRIP_ID,
          arrivalCalc: ship.ARRIVAL_CALC,
          arrivalPortCalc: ship.ARRIVAL_PORT_CALC,
          imo: ship.IMO,
          mmsi: ship.MMSI,
        }));

        setShipList(formattedShips);
        setFilteredShips(formattedShips);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ship data:", error);
        setLoading(false);
      }
    };

    fetchShipsData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-bold">Loading...</div>
    </div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mt-16">
          <div className="flex flex-1">
            <LSidebar 
              ships={shipList} 
              onSearchResults={setFilteredShips}
              onFilterChange={setFilteredShips}
            />
            <div className="w-3/5 mt-4 ml-1">
              <MapWithBounds
                ships={filteredShips}
                onMarkerClick={setSelectedShip}
                showFullRoute={showFullRoute}
                selectedShip={selectedShip}
              />
            </div>
            {selectedShip ? (
              <RSideBar
                ship={selectedShip}
                onShowFullRoute={handleFullRouteToggle}
                showFullRoute={showFullRoute}
              />
            ) : (
              <div className="w-1/5 bg-sidebar-color p-6 text-white flex flex-col justify-center items-center">
                <p className="text-navbar-color text-lg">Gemi seçiniz</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;