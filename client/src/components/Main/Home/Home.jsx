import { useState } from "react";
import MangasList from './MangasList';
import MangaSearch from "./MangaSearch/MangaSearch";

const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  }

  return (
  <div>
    <MangaSearch onSearch={handleSearch} />
    <MangasList searchTerm={searchTerm} />
  </div>
  );
};

export default Home;
