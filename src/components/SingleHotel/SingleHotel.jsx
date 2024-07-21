import { useParams, useSearchParams } from "react-router-dom";
import { useHotels } from "../../context/HotelsProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function SingleHotel() {
  const { id } = useParams();

  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoadingCurrentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div className="">
          {currentHotel.number_of_reviews} reviews &bull;
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.thumbnail_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
