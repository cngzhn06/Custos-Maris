import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {



    /*
  const shipList = [
    {
        name: "YM AMAZON",
        imo: "1910",
        mmsi: "9622578",
        status: 0,
        statusDetail: "Boyutlar Uyumsuz",
        date: "08:00:00",
        lat: 41.0486,
        long: 29.0277,
        nation: "Türkiye",
        size: "153/25",
        speed: "40km",
        year: "2004",
        type: "Yolcu",
        photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1",
    },
    {
        name: "YM AMAZON",
        imo: "1910",
        mmsi: "9622578",
        status: 0,
        statusDetail: "Boyutlar Uyumsuz",
        date: "09:00:00",
        lat: 41.0480,
        long: 29.0300,
        nation: "Türkiye",
        size: "153/25",
        speed: "40km",
        year: "2004",
        type: "Yolcu",
        photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1",
    },
    {
        name: "GARİP BABA",
        imo: "1963",
        mmsi: "3242352",
        status: 0,
        statusDetail: "Boyutlar Uyumsuz",
        date: "08:30:00",
        lat: 40.9805,
        long: 28.9652,
        nation: "Türkiye",
        size: "162/35",
        speed: "21km",
        year: "2001",
        type: "Yolcu",
    },
    {
        name: "GARİP BABA",
        imo: "1963",
        mmsi: "3242352",
        status: 0,
        statusDetail: "Boyutlar Uyumsuz",
        date: "09:30:00",
        lat: 41.0026,
        long: 29.0170,
        nation: "Türkiye",
        size: "162/35",
        speed: "21km",
        year: "2001",
        type: "Yolcu",
    },
    {
        name: "MAVI YILDIZ",
        imo: "2023",
        mmsi: "3748392",
        status: 1,
        statusDetail: "Limanda",
        date: "12:00:00",
        lat: 40.1530,
        long: 26.4030,
        nation: "Türkiye",
        size: "170/30",
        speed: "18km",
        year: "2015",
        type: "Yük",
    },
    {
        name: "MAVI YILDIZ",
        imo: "2023",
        mmsi: "3748392",
        status: 1,
        statusDetail: "Limanda",
        date: "13:00:00",
        lat: 40.1700,
        long: 26.4150,
        nation: "Türkiye",
        size: "170/30",
        speed: "18km",
        year: "2015",
        type: "Yük",
    },
    {
        name: "DENIZ KUŞU",
        imo: "2035",
        mmsi: "5683927",
        status: 0,
        statusDetail: "Seyir Halinde",
        date: "14:00:00",
        lat: 40.0486,
        long: 26.3830,
        nation: "Türkiye",
        size: "200/35",
        speed: "25km",
        year: "2010",
        type: "Yük",
    },
    {
        name: "DENIZ KUŞU",
        imo: "2035",
        mmsi: "5683927",
        status: 0,
        statusDetail: "Seyir Halinde",
        date: "15:00:00",
        lat: 40.1705,
        long: 26.5050,
        nation: "Türkiye",
        size: "200/35",
        speed: "25km",
        year: "2010",
        type: "Yük",
    },
    {
        name: "MAVI YILDIZ",
        imo: "2023",
        mmsi: "3748392",
        status: 0,
        statusDetail: "Boyutlar Uyumsuz",
        date: "14:30:00",
        lat: 40.1730,
        long: 26.4035,
        nation: "Türkiye",
        size: "170/30",
        speed: "18km",
        year: "2015",
        type: "Yük",
    },
];
*/
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
