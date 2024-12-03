import React, { useEffect, useRef } from "react";
import { Map, Marker } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { Popup } from "@maptiler/sdk";

const MapWithBounds = ({ ships }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      container: mapContainerRef.current,
      style:
        `https://api.maptiler.com/maps/landscape/style.json?key=${import.meta.env.VITE_MAPTILER_API_KEY}`,
      center: [28.5, 41.0],
      zoom: 7,
      maxBounds: [
        [26.04291, 39.04],
        [29.5, 41.6],
      ],
      attributionControl: false,
    });

    ships.forEach((ship) => {
      const popup = new Popup().setHTML(`
        <strong>${ship.name}</strong><br />
        <strong>${ship.type}</strong><br />
        Bayrak: ${ship.nation} <br />
        Boyut: ${ship.size} <br />
        Hız: ${ship.speed} <br />
        Yıl: ${ship.year} <br />
        MMSI: ${ship.mmsi}<br />
        Durum: ${ship.status === 1 ? "Başarılı" : ship.statusDetail}
      `);

      new Marker().setLngLat([ship.long, ship.lat]).setPopup(popup).addTo(map);
    });

    return () => {
      map.remove();
    };
  }, [ships]);

  return (
    <>
      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
    </>
  );
};

export default MapWithBounds;
