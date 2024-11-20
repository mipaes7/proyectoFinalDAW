import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getMangaDetailsById, getMangaPictures, getMangaCharacters, getMangaRecommendations } from "../../../services/mangas";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CharactersAccordion from "./CharactersAccordion/CharactersAccordion";
import Recommendations from "./Recommendations/Recommendations";
import { FiBookmark } from "react-icons/fi";

const MangaDetails = () => {

  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [cover, setCover] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [recommendationsByManga, setRecommendationsByManga] = useState(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaData = await getMangaDetailsById(id);
        if (mangaData) setManga(mangaData.data);

        const coversData = await getMangaPictures(id);
        if (coversData && coversData.data.length > 0) {
          const randomCover = coversData.data[Math.floor(Math.random() * coversData.data.length)];
          setCover(randomCover.jpg.image_url);
        }

        const charactersData = await getMangaCharacters(id);
        if (charactersData) {
          const mainCharacters = charactersData.data.filter(char => char.role === "Main");
          setCharacters(mainCharacters);
        }

        const recommendationsData = await getMangaRecommendations(id);
        if (recommendationsData) {
          setRecommendationsByManga(recommendationsData.data.slice(0, 20));
          console.log(recommendationsData.data.slice(0, 20));
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMangaDetails();
  }, [id]);

  const formatAuthorName = (data) => {
    return data.map(author => {
      const nameParts = author.name.split(', ');
      if (nameParts.length === 2) {
        const [lastName, firstName] = nameParts;
        return `${firstName} ${lastName}`;
      } else {
        return nameParts[0];
      }
    }).join(', ');
  };

  const handleAddToLibrary = () => {
    console.log(`Manga with ID ${id} added to library`);
    alert("Manga added to library!");
  };

  return (
    <section className="manga-details">
      {manga ? (<article className="manga-details-cover-info">
        <div className="manga-details-cover">
          <img src={cover} alt="Manga Cover" />
        </div>
        <div className="manga-details-info">
          <h3 className="mangaTitle">{manga.title}</h3>
          <h4 className="mangaAuthor">{formatAuthorName(manga.authors)}</h4>
          <p className="mangaStatus">{manga.status}</p>
          {manga.chapters !== null ? <p className="mangaEpisodes">{manga.chapters} chapters</p> : ""}
          <div className="mangaStats">
            <span className="mangaScore"><p><strong>{"\u{02606}"}</strong>{manga.score}</p><p>{manga.scored_by} users</p></span>
            <span className="mangaRanking"><p>#{manga.rank}</p><p>Ranking</p></span>
          </div>
          <div className="mangaGenres">
            {manga.genres.map((genre, index) => (
              <span key={index} className="genreTag">{genre.name}</span>
            ))}
          </div>
          <button className="add-to-library-btn" onClick={() => handleAddToLibrary(manga.id)}>
            <FiBookmark className="bookmark-icon" />
            Add to Library
          </button>
        </div>
      </article>) : (
        <p>Loading</p>
      )}
      {manga ? (<article className="manga-details-mainInfo">
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Synopsis
          </AccordionSummary>
          <AccordionDetails>
            <p>{manga.synopsis}</p>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            Background
          </AccordionSummary>
          <AccordionDetails>
            <p>{manga.background}</p>
          </AccordionDetails>
        </Accordion>
        {characters ? (<CharactersAccordion characters={characters} />) : (<p>No characters found</p>)}
        <aside className="manga-recommendations">
          <h3 className="manga-recommendations-title">Recommendations</h3>
          {recommendationsByManga ? (<Recommendations recommendationsByManga={recommendationsByManga} />) : (<p>No recommendations found</p>)}
        </aside>
      </article>) :
        (
          <p>Loading</p>
        )}
    </section>
  );
};

export default MangaDetails;
