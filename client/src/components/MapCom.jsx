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
    });

    map.on("load", () => {
      const shipGroups = {};

      ships.forEach((ship) => {
        const key = `${ship.mmsi}-${ship.imo}`;
        if (!shipGroups[key]) {
          shipGroups[key] = [];
        }
        shipGroups[key].push({
          lat: ship.lat,
          long: ship.long,
          date: ship.date,
          name: ship.name,
          type: ship.type,
          status: ship.status,
          statusDetail: ship.statusDetail,
        });
      });

      // Add markers
      ships.forEach((ship) => {
        const popup = new Popup().setHTML(`
          <strong>${ship.name}</strong><br /> 
          <strong>${ship.type}</strong><br />
          Bayrak: ${ship.nation} <br />
          Boyut: ${ship.size} <br />
          Hız: ${ship.speed} <br />
          Yıl: ${ship.year} <br />
          saat: ${ship.date} <br />
          MMSI: ${ship.mmsi}<br />
          Durum: ${ship.status === 1 ? "Başarılı" : ship.statusDetail}
        `);

        const markerElement = document.createElement("img");
        markerElement.src = "ship.png";
        markerElement.style.width = "16px";
        markerElement.style.height = "16px";

        new Marker({ element: markerElement })
          .setLngLat([ship.long, ship.lat])
          .setPopup(popup)
          .addTo(map);
      });

      // Çizgiler için her geminin zaman dilimlerine göre rotalarını çizme
      Object.values(shipGroups).forEach((group) => {
        group.forEach((ship, index) => {
          // Önceki ve sonraki konumlar arasındaki rotayı çizin
          if (index < group.length - 1) {
            const currentShip = group[index];
            const nextShip = group[index + 1];

            const coordinates = [
              [currentShip.long, currentShip.lat], // önceki konum
              [nextShip.long, nextShip.lat], // sonraki konum
            ];

            const routeId = `route-${currentShip.name}-${currentShip.date}-${nextShip.date}`;

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
                "line-color": "#FF5733", // Customize color
                "line-width": 3,
                "line-opacity": 0.6, // Transparanlık ekledik
              },
            });
          }
        });
      });
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
