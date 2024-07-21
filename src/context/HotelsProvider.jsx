import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000/hotels";
const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [currentHotel, setCurrentHotel] = useState([]);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { data: hotels, isLoading } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        isLoadingCurrentHotel,
        currentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHotels() {
  return useContext(HotelContext);
}

export default HotelsProvider;
