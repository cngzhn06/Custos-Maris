import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {

  const shipList = [
    {
      name: "YM AMAZON",
      imo: "1910",
      mmsi: "9622578",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "2024-12-08T08:00:00",
      lat: 41.0486,
      long: 29.0277,
      nation: "Türkiye",
      size: "153/25",
      speed: "40km",
      year: "2004",
      type: "Yolcu",
      photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1", // Added image URL

    },
    {
      name: "YM AMAZON",
      imo: "1910",
      mmsi: "9622578",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "2024-12-08T09:00:00",
      lat: 41.0480,
      long: 29.0300,
      nation: "Türkiye",
      size: "153/25",
      speed: "40km",
      year: "2004",
      type: "Yolcu",
      photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1", // Added image URL

    },
    {
      name: "YM AMAZON",
      imo: "1910",
      mmsi: "9622578",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "2024-12-08T10:00:00",
      lat: 41.0490,
      long: 29.0330,
      nation: "Türkiye",
      size: "153/25",
      speed: "40km",
      year: "2004",
      type: "Yolcu",
      photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1", // Added image URL

    },
    {
      name: "YM AMAZON",
      imo: "1910",
      mmsi: "9622578",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "2024-12-08T11:00:00",
      lat: 41.0500,
      long: 29.0350,
      nation: "Türkiye",
      size: "153/25",
      speed: "40km",
      year: "2004",
      type: "Yolcu",
      photoUrl: "https://static.vesselfinder.net/ship-photo/9622758-229594000-a2fbf9e8f7dc3ca2c1a16181c9c12889/1?v1", // Added image URL
    },
    {
      name: "GARİP BABA",
      imo: "1963",
      mmsi: "3242352",
      status: 0,
      statusDetail: "Boyutlar Uyumsuz",
      date: "2024-12-08T08:30:00",
      lat: 40.1730,
      long: 26.4030,
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
      date: "2024-12-08T09:30:00",
      lat: 40.2145,
      long: 26.4050,
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
      date: "2024-12-08T10:30:00",
      lat: 40.1530,
      long: 26.4030,
      nation: "Türkiye",
      size: "162/35",
      speed: "21km",
      year: "2001",
      type: "Yolcu",
    },
  ];
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage shipList={shipList}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
