import React, { useEffect, useState } from "react";
import axios from "axios";
import MapWithBounds from "../components/MapCom";
import Navbar from "../components/Navbar";
import LSidebar from "../components/LSidebar";

const HomePage = () => {
  const [shipList, setShipList] = useState([]); 
  console.log("🚀 ~ HomePage ~ shipList:", shipList)

  /* 
  
  // FAKEAPI
  const shipList = [
    {
      name: "YM AMAZON",
      imo: "1910",
      mmsi: "9622578",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "03.11.2002 20.00",
      lat: 41.0486,
      long: 29.0277,
      nation:"Türkiye",
      size: "153/25",
      speed:"40km",
      year:"2004",
      type:"Yolcu",
    },
    {
      name: "YM FUJI",
      mmsi: "1231231",
      imo: "1907",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "03.11.2002 20.00",
      lat: 41.1197,
      long: 29.0832,
      nation:"Türkiye",
      size: "165/15",
      speed:"12km",
      year:"2002",
      type:"Kargo",

    },
    {
      name: "GARİP BABA",
      mmsi: "3242352",
      imo: "1963",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "03.11.2002 20.00",
      lat: 40.2139,
      long: 26.4044,
      nation:"Türkiye",
      size: "162/35",
      speed:"21km",
      year:"2001",
      type:"Yolcu",

    },
    {
      name: "ZEYCAN ANA",
      mmsi: "6453254",
      imo: "1923",
      status: 1,
      statusDetail: "Başarılı",
      date: "03.11.2002 20.00",
      lat: 40.0556,
      long: 26.3498,
      nation:"Türkiye",
      size: "161/25",
      speed:"20km",
      year:"2000",
      type:"Kargo",

    },
  ];

  */


  console.log("🚀 ~ HomePage ~ shipList:", shipList)

  
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

  

  const faultyShips = shipList.filter((ship) => ship.status === 0); 

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div>
          <Navbar />
        </div>
        <div className="flex flex-col flex-1 mt-16">
          <div className="flex flex-1">
            <LSidebar ships={faultyShips} /> 
            <div className="w-4/5 mt-4">
              <MapWithBounds ships={shipList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
