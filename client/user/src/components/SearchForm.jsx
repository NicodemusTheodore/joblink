/* eslint-disable react/prop-types */
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { fetchJobs } from "../stores/actions/actionCreator";

const SearchForm = ({
  containerClass,
  inputClass,
  buttonClass,
  iconOrText,
  searchInput,
  setSearchInput,
}) => {
  const dispatch = useDispatch();

  const handleSearchForm = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    dispatch(fetchJobs(searchInput));
  };

  return (
    <form className={containerClass}>
      <input
        type="text"
        name="title"
        className={inputClass}
        value={searchInput}
        placeholder="Search for a job title"
        onChange={handleSearchForm}
      />
      <button onClick={handleSearch} className={buttonClass}>
        {iconOrText === "icon" ? (
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        ) : (
          "Search"
        )}
      </button>
    </form>
  );
};

export default SearchForm;
