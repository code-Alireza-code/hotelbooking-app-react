import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/bookmarks";
const BookmarksContext = createContext();

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: {},
  error: null,
};

function bookmarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: payload,
        isLoading: false,
        error: null,
      };
    case "bookmark/loaded":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
        error: null,
      };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        currentBookmark: payload,
        bookmarks: [...state.bookmarks, payload],
        error: null,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        currentBookmark: state.currentBookmark || {},
        error: null,
        bookmarks: state.bookmarks.filter((bookmark) => bookmark.id != payload),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      throw new Error("unknown action");
  }
}

function BookmarksProvider({ children }) {
  const [{ isLoading, bookmarks, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(BASE_URL);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: error });
      }
    }
    fetchBookmarkList();
  }, []);

  async function getBookmark(id) {
    if (currentBookmark?.id == id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error(error.message);
    }
  }

  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(BASE_URL, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error(error.message);
    }
  }

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: error });
      toast.error(error.message);
    }
  }

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBookmarks() {
  return useContext(BookmarksContext);
}

export default BookmarksProvider;

//! reducer function SHOULD BE PURE!!!
