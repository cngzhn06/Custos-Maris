import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapWithBounds = ({ ships, onMarkerClick }) => {
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [currentRouteId, setCurrentRouteId] = useState(null);

  useEffect(() => {
    const map = new Map({
      container: mapContainerRef.current,
      style: `${import.meta.env.VITE_MAPTILER_API_KEY}`,
      center: [28.5, 41.0],
      zoom: 3,
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    setMapInstance(map);

    map.on("load", () => {
      const shipsGrouped = {};

      ships.forEach((ship) => {
        const key = `${ship.imo}-${ship.mmsi}`;
        if (!shipsGrouped[key]) {
          shipsGrouped[key] = [];
        }
        shipsGrouped[key].push(ship);
      });

      Object.values(shipsGrouped).forEach((shipGroup) => {
        const lastShip = shipGroup[shipGroup.length - 1];
        const popupContent = `
          <strong>Gemi Tipi:</strong> ${lastShip.shipType}<br />
          <strong>Hız:</strong> ${lastShip.speed} knot<br />
          <strong>Konum:</strong> Lat: ${lastShip.lat}, Long: ${lastShip.lon}<br />
          <strong>Yön:</strong> ${lastShip.course}°<br />
          <strong>Başlangıç Limanı:</strong> ${lastShip.departurePort}<br />
          <strong>IMO:</strong> ${lastShip.imo}<br />
          <strong>MMSI:</strong> ${lastShip.mmsi}<br />
          <strong>Zaman Damgası:</strong> ${lastShip.timestamp}
        `;

        const popup = new Popup().setHTML(popupContent);

        const markerElement = document.createElement("img");
        markerElement.src = "ship.png"; 
        markerElement.style.width = "20px";
        markerElement.style.height = "20px";

        const marker = new Marker({ element: markerElement })
          .setLngLat([lastShip.lon, lastShip.lat])
          .setPopup(popup)
          .addTo(map);

        marker.getElement().addEventListener("click", () => {
          // Tüm mevcut rotaları temizle
          map.getStyle().layers.forEach((layer) => {
            if (layer.id.startsWith("line-")) {
              map.removeLayer(layer.id); 
              map.removeSource(layer.id); 
            }
          });

          const coordinates = shipGroup.map((ship) => [ship.lon, ship.lat]);
          const routeId = `line-${lastShip.imo}-${lastShip.mmsi}`;
          setCurrentRouteId(routeId); // Yeni rota ID'sini güncelle

          // Yeni kaynak ekleniyor
          map.addSource(routeId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: coordinates,
              },
            },
          });

          // Yeni katman ekleniyor
          map.addLayer({
            id: routeId,
            type: "line",
            source: routeId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#FF5733", 
              "line-width": 2,         
            },
          });

          // Update the selected ship in the sidebar
          onMarkerClick(lastShip);  // Pass the selected ship to the parent
        });
      });
    });

    return () => {
      map.remove();
    };
  }, [ships, onMarkerClick]);

  return <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />;
};

export default MapWithBounds;
