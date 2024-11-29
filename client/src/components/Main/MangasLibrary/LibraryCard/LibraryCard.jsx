import React, { useEffect, useState } from 'react';
import { getMangaDetailsByTitle } from '../../../../services/mangas';

const LibraryCard = ({ manga }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const getMangaDetails = async () => {
      try {
        const response = await getMangaDetailsByTitle(manga.title);

        // Assuming the API returns an array with a single manga object
        if (response.length > 0) {
          setMangaDetails(response[0]); // Set the first item in the array
        } else {
          console.error(`No details found for ${manga.title}`);
        }
      } catch (error) {
        console.error(`Error fetching details for ${manga.title}:`, error);
      } finally {
        setIsLoading(false); // Ensure loading stops even if there is an error
      }
    };

    getMangaDetails();
  }, [manga.title]);

  if (isLoading) {
    return (
      <div className="libraryCard">
        <p>Loading...</p>
      </div>
    );
  }

  if (!mangaDetails) {
    return (
      <div className="libraryCard">
        <p>Details not available</p>
      </div>
    );
  }

  return (
    <div
    // key={index}
    className={`libraryCard`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
    <h4>{mangaDetails.title}</h4>
    <div><img src={mangaDetails.cover_image_url} alt={mangaDetails.title} /></div>
  </div>
  );
};

export default LibraryCard;
