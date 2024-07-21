import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [err, setErr] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setErr("your browser does not support geoLocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setErr(error.message);
        setIsLoading(false);
      }
    );
  }
  return { isLoading, err, getPosition, position };
}
