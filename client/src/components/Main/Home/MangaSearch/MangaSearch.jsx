import React, { useState } from "react";

const MangaSearch = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mangaSearch">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for manga"
        aria-label="Search for manga"
      />
      <button onClick={handleSearch} disabled={!inputValue.trim()}>
        Search
      </button>
    </div>
  );
};

export default MangaSearch;
