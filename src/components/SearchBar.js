const SearchBar = ({ onSearch, searchInput, placeholder }) => {
  const handleChange = (event) => {
    event.preventDefault();

    const {
      target: { value },
    } = event;
    onSearch(value);
  };

  return (
    <div>
        <div className="d-flex justify-content-end">
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            className="search-field text-grey mr-3"
            placeholder={placeholder}
          />
        </div>
    </div>
  );
};

export default SearchBar;
