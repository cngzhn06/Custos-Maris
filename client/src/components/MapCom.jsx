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
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeLayerId, setRouteLayerId] = useState(null);

  // Haritayı sadece bir kere oluştur
  useEffect(() => {
    if (mapRef.current) return;

    const map = new Map({
      container: mapContainerRef.current,
      style: `${import.meta.env.VITE_MAPTILER_API_KEY}`,
      center: [28.5, 41.0],
      zoom: 3,
      attributionControl: false,
      preserveDrawingBuffer: true,
    });

    map.on('load', () => {
      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      Object.values(markersRef.current).forEach(marker => marker.remove());
      markersRef.current = {};
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Marker'ları güncelle
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !ships.length) return;

    const map = mapRef.current;
    const currentMarkers = markersRef.current;

    // Mevcut marker'ları grupla
    const shipsGrouped = {};
    ships.forEach((ship) => {
      if (!ship.lon || !ship.lat) return; // Koordinatları olmayan gemileri atla
      const key = `${ship.imo}-${ship.mmsi}`;
      if (!shipsGrouped[key]) {
        shipsGrouped[key] = [];
      }
      shipsGrouped[key].push(ship);
    });

    // Eski marker'ları kaldır
    Object.keys(currentMarkers).forEach((key) => {
      if (!shipsGrouped[key]) {
        currentMarkers[key].remove();
        delete currentMarkers[key];
      }
    });

    // Yeni marker'ları ekle veya güncelle
    Object.entries(shipsGrouped).forEach(([key, shipGroup]) => {
      const lastShip = shipGroup[shipGroup.length - 1];
      
      if (!lastShip.lon || !lastShip.lat) return; // Koordinat kontrolü

      const popupContent = `
        <div class="p-3 bg-white rounded-lg shadow-lg">
          <h3 class="text-lg font-bold mb-2">${lastShip.name || 'İsimsiz Gemi'}</h3>
          <div class="space-y-1">
            <p><strong>Gemi Tipi:</strong> ${lastShip.shipType || 'N/A'}</p>
            <p><strong>Hız:</strong> ${lastShip.speed ? `${lastShip.speed} knot` : 'N/A'}</p>
            <p><strong>Konum:</strong> ${lastShip.lat.toFixed(4)}°, ${lastShip.lon.toFixed(4)}°</p>
            <p><strong>Yön:</strong> ${lastShip.course ? `${lastShip.course}°` : 'N/A'}</p>
            <p><strong>IMO:</strong> ${lastShip.imo || 'N/A'}</p>
            <p><strong>MMSI:</strong> ${lastShip.mmsi || 'N/A'}</p>
          </div>
        </div>
      `;

      if (currentMarkers[key]) {
        // Mevcut marker'ı güncelle
        currentMarkers[key].setLngLat([lastShip.lon, lastShip.lat]);
      } else {
        try {
          // Yeni marker oluştur
          const markerElement = document.createElement("div");
          markerElement.className = "marker";
          markerElement.style.backgroundImage = "url('/ship.png')";
          markerElement.style.backgroundSize = "contain";
          markerElement.style.width = "24px";
          markerElement.style.height = "24px";
          markerElement.style.backgroundRepeat = "no-repeat";
          markerElement.style.cursor = "pointer";

          const popup = new Popup({
            offset: 25,
            closeButton: true,
            className: 'custom-popup'
          }).setHTML(popupContent);

          const marker = new Marker({ element: markerElement })
            .setLngLat([lastShip.lon, lastShip.lat])
            .setPopup(popup)
            .addTo(map);

          marker.getElement().addEventListener("click", (e) => {
            e.stopPropagation();
            onMarkerClick(lastShip);
          });

          currentMarkers[key] = marker;
        } catch (error) {
          console.error("Marker oluşturma hatası:", error);
        }
      }
    });
  }, [ships, mapLoaded]);

  // Rota çizgisini güncelle
  useEffect(() => {
    if (!mapRef.current || !mapLoaded || !selectedShip) return;

    const map = mapRef.current;
  
    if (routeLayerId) {
      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeLayerId)) map.removeSource(routeLayerId);
      setRouteLayerId(null);
    }
  
    if (!showFullRoute) return;
  
    const shipGroup = ships.filter(
      (ship) => ship.imo === selectedShip.imo && ship.mmsi === selectedShip.mmsi
    );
  
    const coordinates = shipGroup
      .filter(ship => ship.lon && ship.lat)
      .map(ship => [ship.lon, ship.lat]);

    if (coordinates.length < 2) return;
  
    const newRouteLayerId = `line-${selectedShip.imo}-${selectedShip.mmsi}`;
    setRouteLayerId(newRouteLayerId);
  
    try {
      map.addSource(newRouteLayerId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: showFullRoute === "lastHourRoute" 
              ? coordinates.slice(-20) 
              : coordinates,
          },
        },
      });
    
      map.addLayer({
        id: newRouteLayerId,
        type: "line",
        source: newRouteLayerId,
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#FF5733",
          "line-width": 3,
          "line-opacity": 0.8,
        },
      });
    } catch (error) {
      console.error("Rota çizme hatası:", error);
    }
  }, [showFullRoute, selectedShip, ships, mapLoaded]);
  
  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />
  );
};

export default MapWithBounds;
