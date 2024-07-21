import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import Loader from "../Loader/Loader";
import { useBookmarks } from "../../context/BookmarksProvider";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const { createBookmark } = useBookmarks();
  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocationData() {
      setGeoCodingError(null);
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );

        if (!data.countryCode)
          throw new Error(
            "this location is not a city please select somewhere else"
          );

        setCity(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    getLocationData();
  }, [lat, lng]);

  const handleAddBookmark = async (e) => {
    e.preventDefault();
    if (!city || !country) return;

    const newBookmark = {
      cityName: city,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: city + " " + country,
      id: new Date().getTime(),
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <strong>{geoCodingError}</strong>;
  return (
    <div>
      <h2>Bookmark new Location</h2>
      <br />
      <form className="form" onSubmit={handleAddBookmark}>
        <div className="formControl">
          <label htmlFor="cityName">city name :</label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="countryName">country name :</label>
          <input
            type="text"
            name="countryName"
            id="countryName"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <ReactCountryFlag svg countryCode={countryCode} className="flag" />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            <MdArrowBack />
            back
          </button>
          <button className="btn btn--primary" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
