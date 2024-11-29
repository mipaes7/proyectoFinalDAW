import { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
import { getMangaDetailsById, getMangaPictures, getMangaCharacters, getMangaRecommendations, createManga, getMangaDetailsByTitle } from "../../../services/mangas";
import { createLibraryEntry } from "../../../services/library";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CharactersAccordion from "./CharactersAccordion/CharactersAccordion";
import Recommendations from "./Recommendations/Recommendations";
import { FiBookmark } from "react-icons/fi";
import { AuthContext } from "../../../context/authContext";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MangaDetails = () => {

  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [cover, setCover] = useState(null);
  const [characters, setCharacters] = useState(null);
  const [recommendationsByManga, setRecommendationsByManga] = useState(null);
  const { auth } = useContext(AuthContext);
  const [alert, setAlert] = useState({ message: '', severity: '' });

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaData = await getMangaDetailsById(id);
        if (mangaData) setManga(mangaData.data);

        // const coversData = await getMangaPictures(id);
        // if (coversData && coversData.data.length > 0) {
        //   const randomCover = coversData.data[Math.floor(Math.random() * coversData.data.length)];
        //   setCover(randomCover.jpg.image_url);
        // }

        // setCover(manga.images.jpg.large_image_url);

        const charactersData = await getMangaCharacters(id);
        if (charactersData) {
          const mainCharacters = charactersData.data.filter(char => char.role === "Main");
          setCharacters(mainCharacters);
        }

        const recommendationsData = await getMangaRecommendations(id);
        if (recommendationsData) {
          setRecommendationsByManga(recommendationsData.data.slice(0, 6));
          console.log(recommendationsData.data.slice(0, 6));
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

  const handleAddToLibrary = async () => {
    try {
      const mangaExists = await getMangaDetailsByTitle(manga.title);

      if (mangaExists.length === 0) {
        await createManga({
          title: manga.title,
          author: formatAuthorName(manga.authors),
          synopsis: manga.synopsis,
          cover_image_url: manga.images.jpg.large_image_url,
          genres: manga.genres.length !== 0 ? manga.genres.map(genre => genre.name).join(', ') : null,
          themes: manga.themes.length !== 0 ? manga.themes.map(theme => theme.name).join(', ') : null,
        });
      }

      await createLibraryEntry(auth.email, manga.title, "Plan to Read");
      setAlert({ message: "Manga added to library!", severity: "success" });
    } catch (error) {
      // console.log(error.response.status);
      if (error.response?.status === 500) {
        setAlert({ message: "Manga already exists in your library!", severity: "error" });
      } else {
        setAlert({ message: "Manga already exists in your library!", severity: "error" });
      }
    }
  };

  return (
    <section className="manga-details">
      {manga ? (<article className="manga-details-cover-info">
        <div className="manga-details-cover">
          <img src={manga.images.jpg.large_image_url} alt="Manga Cover" />
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
          {alert.message && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={alert.severity} onClose={() => setAlert({ message: '', severity: '' })}>
                {alert.message}
              </Alert>
            </Stack>
          )}
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
