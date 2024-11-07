import React, { useState } from "react";

const MangaCard = ({
  manga: { title, synopsis, chapters, status, score, scored_by, rank, genres, mal_id },
  mangaCover: { large_image_url }
}) => {

  const [isHovered, setIsHovered] = useState(false);

  return <article
    className="mangaCard"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div
      className="mangaCover"
      style={{ backgroundImage: `url(${large_image_url})` }}>
      {isHovered && (
        <div className="mangaSynopsis">
          <p>{synopsis}</p>
          <button>See more    {"\u{027A4}"}</button>
        </div>
      )}
      </div>
      <div className="mangaInfo">
        <h3 className="mangaTitle">{title}</h3>
        <p className="mangaStatus">{status}</p>
        {chapters !== null ? <p className="mangaEpisodes">{chapters} chapters</p> : ""}
        <div className="mangaStats">
          <span className="mangaScore"><p><strong>{"\u{02606}"}</strong>{score}</p><p>{scored_by} users</p></span>
          <span className="mangaRanking"><p>#{rank}</p><p>Ranking</p></span>
        </div>
        <div className="mangaGenres">
          {genres.map((genre, index) => (
            <span key={index} className="genreTag">{genre.name}</span>
          ))}
        </div>
      </div>
  </article>;
};

export default MangaCard;
