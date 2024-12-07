import React, { useEffect, useState } from "react";
import axios from "axios";
import MapWithBounds from "../components/MapCom";
import Navbar from "../components/Navbar";
import LSidebar from "../components/LSidebar";

const HomePage = ({ shipList }) => {
  //  const [shipList, setShipList] = useState([]);

  console.log("🚀 ~ HomePage ~ shipList:", shipList);

  /* 
  useEffect(() => {
    const fetchShipsData = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:5001/vessels");
        setShipList(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error("Gemi verileri alınırken hata oluştu:", error);
        setLoading(false); 
      }
    };

    fetchShipsData();
  }, []);

  */

  const faultyShips = shipList.filter((ship) => ship.status === 0);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mt-16">
          <div className="flex flex-1 ">
            <LSidebar ships={faultyShips} />
            <div className="w-5/6 mt-4 ml-1">
              <MapWithBounds ships={shipList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
