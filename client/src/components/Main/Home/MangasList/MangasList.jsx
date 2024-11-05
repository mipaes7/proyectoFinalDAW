import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import MangaCard from './MangaCard';
import { getMangas } from "../../../../services/mangas";

const MangasList = () => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMangas = async () => {
        setLoading(true);
        try {
            const data = await getMangas(page, 10, searchTerm);
            if (data) {
                setMangas(data.data);
                console.log(data.data);
            }
        } catch (error) {
            setError("Failed to fetch mangas.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    fetchMangas();
}, [page, searchTerm]);


const renderMangaCard = () => {
  return mangas.map((manga) => (
    <MangaCard
      key={uuidv4()}
      manga={manga}
      mangaCover={manga.images.jpg}
    />
  ))
};

  return (<section className="searchAndListContainer">
    <article className="mangaCardsContainer">
      hello
      {loading ? <p>Loading...</p> : renderMangaCard()}
    </article>
  </section>
  );
};

export default MangasList;
