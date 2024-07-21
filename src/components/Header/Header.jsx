import { useState } from "react";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { MdLocationOn } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (
    <div className="header">
      <div className="headerSearch">
        <div className="headerSearchItem">
          <Link to="/bookmark">Bookmarks</Link>
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            type="text"
            placeholder="where to go..."
            className="headerSearchInput"
            name="destination"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div onClick={() => setOpenDate(!openDate)} className="dateDropDown">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              ranges={date}
              className="date"
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div id="optionDropDown" onClick={() => setOpenOptions(!openOptions)}>
            {options.adult} adult &bull; {options.children} children &bull;
            {options.room} room
          </div>
          {openOptions && (
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              options={options}
              setOptions={setOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
        <div className="headerSearchItem">
          <User />
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, setOptions, setOpenOptions }) {
  const optionTypes = [
    {
      id: 1,
      type: "adult",
    },
    {
      id: 2,
      type: "children",
    },
    {
      id: 3,
      type: "room",
    },
  ];
  const { ref } = useOutsideClick("optionDropDown", () =>
    setOpenOptions(false)
  );
  return (
    <div className="guestOptions" ref={ref}>
      {optionTypes.map((item) => (
        <OptionItem
          key={item.id}
          role={item.type}
          options={options}
          setOptions={setOptions}
        />
      ))}
    </div>
  );
}

function OptionItem({ options, role, setOptions }) {
  const handleOption = (type) => {
    setOptions((prev) => {
      return {
        ...prev,
        [role]: type == "inc" ? options[role] + 1 : options[role] - 1,
      };
    });
  };

  return (
    <div className="guestOptionItem">
      <span className="optionText">{role}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          onClick={() => handleOption("dec")}
          disabled={
            role === "children" ? options[role] == 0 : options[role] == 1
          }
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[role]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOption("inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button onClick={handleLogout}>
            <HiLogout className="icon" />
          </button>
        </div>
      ) : (
        <NavLink to="/login">login</NavLink>
      )}
    </div>
  );
}
