import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data: hotels, isLoading } = useFetch("http://localhost:5000/hotels");

  if (isLoading) return <p>Loading datas...</p>;

  return (
    <div className="nearbyLocation">
      <h2>Nearby location</h2>
      <div className="locationList">
        {hotels.map((item) => (
          <div key={item.id} className="locationItem">
            <img src={item.thumbnail_url} alt={item.name} />
            <div className="locationItemDesc">
              <p className="location">{item.smart_location}</p>
              <p className="name">{item.name}</p>
              <p className="price">
                &euro;&nbsp;{item.price}&nbsp;<span> / night</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LocationList;
