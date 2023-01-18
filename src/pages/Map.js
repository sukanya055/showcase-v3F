import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import osm from "../utils/osm-provider";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import location from "../assets/location.png";
const Map = ({ productData }) => {
  const position = [51.505, -0.09];

  const [center, setCenter] = useState({
    lat: productData?.coordinates?.lat,
    lng: productData?.coordinates?.lng,
  });
  const MarkerIcon = new L.Icon({
    iconUrl: location,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -46],
  });
  const mapRef = useRef();
  return (
    <MapContainer
      center={center}
      zoom={13}
      ref={mapRef}
      className="w-full h-full"
    >
      <TileLayer
        url={osm?.maptiler?.url}
        attribution={osm?.maptiler?.attribution}
      />
      <Marker position={[center?.lat, center.lng]} icon={MarkerIcon}>
        <Popup>
          <b>Cake shop</b>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
