import React, { useState } from "react";

const MangaCard = ({
  manga: {title, synopsis, mal_id},
  mangaCover: {large_image_url}
}) => {

  const [isHovered, setIsHovered] = useState(false);

  return <article
   className="mangaCard"
   onMouseEnter={() => setIsHovered(true)}
   onMouseLeave={() => setIsHovered(false)}
   >
    <div 
    className="mangaCover"
    style={{backgroundImage: `url(${large_image_url})`}}>
      {isHovered && (
        <div className="mangaSynopsis">
          <p>{synopsis}</p>
          <aside className="title-button-container">
          <h3>{title}</h3>
          <button>{"\u{0279C}"}</button>
          </aside>
        </div>
      )}
    </div>
  </article>;
};

export default MangaCard;
