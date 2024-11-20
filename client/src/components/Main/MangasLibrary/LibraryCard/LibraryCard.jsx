import React from 'react';

const LibraryCard = ({ manga }) => {
  return (
    <div className="libraryCard">
      <h3 className="mangaTitle">{manga.title}</h3>
    </div>
  );
};

export default LibraryCard;