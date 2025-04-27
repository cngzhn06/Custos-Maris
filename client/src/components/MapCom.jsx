import React, { useEffect, useRef, useState } from "react";
import { Map, Marker, Popup } from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const MapWithBounds = ({
  ships,
  onMarkerClick,
  showFullRoute,
  selectedShip,
}) => {
  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeLayerId, setRouteLayerId] = useState(null);

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
        markerElement.src = "ship.png"; // Gemi simgesi
        markerElement.style.width = "20px";
        markerElement.style.height = "20px";

        const marker = new Marker({ element: markerElement })
          .setLngLat([lastShip.lon, lastShip.lat])
          .addTo(map);

        marker.getElement().addEventListener("click", () => {
          // Marker tıklandığında gemi bilgilerini sidebar'a aktar
          onMarkerClick(lastShip);
        });
      });
    });

    return () => {
      map.remove();
    };
  }, [ships, onMarkerClick]);

  useEffect(() => {
    if (!mapInstance || !selectedShip) return;
  
    if (routeLayerId) {
      mapInstance.removeLayer(routeLayerId);
      mapInstance.removeSource(routeLayerId);
      setRouteLayerId(null);
    }
  
    if (!showFullRoute) return;
  
    const shipGroup = ships.filter(
      (ship) => ship.imo === selectedShip.imo && ship.mmsi === selectedShip.mmsi
    );
  
    const coordinates =
      showFullRoute === "lastHourRoute"
        ? shipGroup.slice(-20).map((ship) => [ship.lon, ship.lat]) // Last 20 points
        : shipGroup.map((ship) => [ship.lon, ship.lat]); // Full route
  
    if (coordinates.length === 0) return;
  
    const newRouteLayerId = `line-${selectedShip.imo}-${selectedShip.mmsi}`;
    setRouteLayerId(newRouteLayerId);
  
    // Add new source and layer
    mapInstance.addSource(newRouteLayerId, {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      },
    });
  
    mapInstance.addLayer({
      id: newRouteLayerId,
      type: "line",
      source: newRouteLayerId,
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#FF5733", // Adjust color as needed
        "line-width": 2, // Adjust width as needed
      },
    });
  }, [showFullRoute, selectedShip, ships, mapInstance]);
  
  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default MapWithBounds;
