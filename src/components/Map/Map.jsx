import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useHotels } from "../../context/HotelsProvider";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLocatiom";
import Loader from "../Loader/Loader";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLocations }) {
  const [mapCenter, setMapCenter] = useState([48.8, 2.3]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [lat, lng] = useUrlLocation();

  const {
    isLoading: isLoadingGeoPosition,
    position: geoLocationPosition,
    err,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLocationPosition.lat && geoLocationPosition.lng)
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={true}
        className="map"
      >
        <button className="getLocation" onClick={getPosition}>
          {isLoadingGeoPosition ? "Loading" : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.smart_location || item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
