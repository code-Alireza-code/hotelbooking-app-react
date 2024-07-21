import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../../context/BookmarksProvider";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { MdArrowBack } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getBookmark, isLoading, currentBookmark: item } = useBookmarks();

  useEffect(() => {
    getBookmark(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <button onClick={() => navigate(-1)} className="btn btn--back">
        <MdArrowBack></MdArrowBack>&nbsp;
        <span>go Back </span>
      </button>
      <br />
      <br />
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={item.countryCode} />
        &nbsp;<strong>{item.cityName}</strong>
        &nbsp; <span>{item.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
