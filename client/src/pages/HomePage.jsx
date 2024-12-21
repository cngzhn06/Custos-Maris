import React, { useEffect, useState } from "react";
import MapWithBounds from "../components/MapCom";
import Navbar from "../components/Navbar";
import LSidebar from "../components/LSidebar";
import RSideBar from "../components/RSideBar";

const HomePage = () => {
  const [shipList, setShipList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShip, setSelectedShip] = useState(null);
  const [showFullRoute, setShowFullRoute] = useState(false);
  const handleFullRouteToggle = (mode) => {
    setShowFullRoute(mode); // Set mode as either 'fullRoute' or 'lastHourRoute'
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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ship data:", error);
        setLoading(false);
      }
    };

    fetchShipsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mt-16">
          <div className="flex flex-1">
            <LSidebar />
            <div className="w-5/6 mt-4 ml-1">
              <MapWithBounds
                ships={shipList}
                onMarkerClick={setSelectedShip}
                showFullRoute={showFullRoute}
                selectedShip={selectedShip}
              />
            </div>
            {selectedShip && (
              <RSideBar
                ship={selectedShip}
                onShowFullRoute={handleFullRouteToggle}
                showFullRoute={showFullRoute}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
