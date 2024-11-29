import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import MangaCard from './MangaCard';
import MangaListPagination from "../MangasListPagination/MangasListPagination";
import { getMangas } from "../../../../services/mangas";

const MangasList = ({searchTerm}) => {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMangas = async () => {
        setLoading(true);
        try {
            const data = await getMangas(page, 12, searchTerm);
            if (data) {
                setMangas(data.data);
                console.log(data.data);
                setTotalPages(data.pagination.last_visible_page);
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

const handlePageChange = (newPage) => {
  setPage(newPage);
}

return (<section className="mangas-list">
  <article className="manga-cards-container">
    {loading ? <p>Loading...</p> : renderMangaCard()}
  </article>
  <MangaListPagination 
    page={page}
    totalPages={totalPages}
    onPageChange={handlePageChange}
  />
</section>
);
};

export default MangasList;
