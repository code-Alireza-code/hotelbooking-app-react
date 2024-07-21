import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
  const { hotels, isLoading, currentHotel } = useHotels();

  if (isLoading) return <Loader />;

  return (
    <div className="searchList">
      <h2>Search Results ({hotels.length})</h2>
      {hotels.map((item) => (
        <Link
          key={item.id}
          to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
        >
          <div
            className={`searchItem ${
              currentHotel.id == item.id ? "current-hotel" : ""
            }`}
          >
            <img src={item.thumbnail_url} alt={item.name} />
            <div className="searchItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p>
                {item.price}&nbsp;&euro;<span>&nbsp;/night</span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Hotels;
