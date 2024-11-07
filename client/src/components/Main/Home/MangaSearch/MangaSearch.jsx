import React, { useState } from "react";

const MangaSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="mangaSearch">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for manga"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default MangaSearch;
