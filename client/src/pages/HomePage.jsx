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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const handleFullRouteToggle = (mode) => {
    setShowFullRoute(mode);
  };

  const handleShipSelect = (ship) => {
    if (selectedShip && selectedShip.imo === ship.imo && selectedShip.mmsi === ship.mmsi) {
      setSelectedShip(null);
      setRightSidebarOpen(false);
    } else {
      setSelectedShip(ship);
      setRightSidebarOpen(true);
    }
  };

  useEffect(() => {
    const fetchShipsData = async () => {
      try {
        const response = await fetch("http://localhost:3000/messages");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        
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
    return (
      <div className="flex justify-center items-center h-screen bg-sidebar-color">
        <div className="text-2xl font-bold text-navbar-color">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-sidebar-color">
      <Navbar />
      <div className="flex flex-1 mt-20">
        <LSidebar 
          ships={shipList} 
          onSearchResults={setFilteredShips}
          onFilterChange={setFilteredShips}
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        />
        
        <div className={`flex-1 transition-all duration-300`}>
          <MapWithBounds
            ships={filteredShips}
            onMarkerClick={handleShipSelect}
            showFullRoute={showFullRoute}
            selectedShip={selectedShip}
          />
        </div>
        
        {selectedShip && (
          <RSideBar
            ship={selectedShip}
            onShowFullRoute={handleFullRouteToggle}
            showFullRoute={showFullRoute}
            isOpen={rightSidebarOpen}
            onToggle={() => setRightSidebarOpen(!rightSidebarOpen)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;