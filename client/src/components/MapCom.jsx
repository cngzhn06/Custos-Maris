import React, { useEffect, useRef } from "react";
import { Map, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapWithBounds = ({ ships }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new Map({
      container: mapContainerRef.current,
      style: `${import.meta.env.VITE_MAPTILER_API_KEY}`,
      center: [28.5, 41.0],
      zoom: 7,
      maxBounds: [
        [26.04291, 39.04],
        [29.5, 41.6],
      ],
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    map.on("load", () => {
      const shipGroups = {};

      ships.forEach((ship) => {
        const key = `${ship.mmsi}-${ship.imo}`;
        if (!shipGroups[key]) {
          shipGroups[key] = [];
        }
        shipGroups[key].push(ship);
      });

      Object.values(shipGroups).forEach((group) => {
        group.sort((a, b) => new Date(a.date) - new Date(b.date));

        const coordinates = group.map((ship) => [ship.long, ship.lat]);
        if (coordinates.length > 1) {
          const routeId = `route-${group[0].mmsi}`;
          map.addSource(routeId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates,
              },
            },
          });

          map.addLayer({
            id: routeId,
            type: "line",
            source: routeId,
            paint: {
              "line-color": "#FF5733",
              "line-width": 3,
              "line-opacity": 0.6,
            },
          });
        }

        const lastShip = group[group.length - 1];

        const popupContent = `
          ${lastShip.photoUrl ? `<div style="text-align: center;">
            <img src="${lastShip.photoUrl}" alt="${lastShip.name}" style="width: 100%; max-width: 200px; margin-bottom: 10px;" />
          </div>` : ""}
          <strong>${lastShip.name}</strong><br /> 
          <strong>${lastShip.type}</strong><br />
          Bayrak: ${lastShip.nation} <br />
          Boyut: ${lastShip.size} <br />
          Hız: ${lastShip.speed} <br />
          Yıl: ${lastShip.year} <br />
          Tarih: ${new Date(lastShip.date).toLocaleString()} <br />
          MMSI: ${lastShip.mmsi}<br />
          Durum: ${lastShip.status === 1 ? "Başarılı" : lastShip.statusDetail}
        `;

        const popup = new Popup().setHTML(popupContent);

        const markerElement = document.createElement("img");
        markerElement.src = "ship.png";
        markerElement.style.width = "16px";
        markerElement.style.height = "16px";

        new Marker({ element: markerElement })
          .setLngLat([lastShip.long, lastShip.lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, [ships]);

  return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapWithBounds;
