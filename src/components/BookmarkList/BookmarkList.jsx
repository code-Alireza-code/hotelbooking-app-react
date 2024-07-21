import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../../context/BookmarksProvider";
import Loader from "../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

function BookmarkList() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmarks();
  const navigate = useNavigate();

  const handleBookmarkDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
    navigate("/bookmark");
  };

  if (isLoading) return <Loader />;
  if (!isLoading && !bookmarks.length)
    return <h3>there is no bookmarks here</h3>;
  return (
    <div>
      <h2>Bookmark List</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <Link
            key={item.id}
            to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`bookmarkItem ${
                currentBookmark.id == item.id ? "current-bookmark" : ""
              }`}
            >
              <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;<strong>{item.cityName}</strong>
              &nbsp;{" "}
              <span>
                {item.country.split(" ").length < 5
                  ? item.country
                  : item.country.split(" ").slice(0, 5).join(" ")}
              </span>
              <button
                className="trash"
                onClick={(e) => handleBookmarkDelete(e, item.id)}
              >
                <HiTrash className="icon" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;
