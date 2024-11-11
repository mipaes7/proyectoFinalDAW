export const getMangas = async (page = 1, limit = 10, searchTerm = '') => {
    try {
        let response;
        if (searchTerm) {
            response = await fetch(`https://api.jikan.moe/v4/manga?q=${searchTerm}&page=${page}&limit=${limit}`);
        } else {
            response = await fetch(`https://api.jikan.moe/v4/top/manga?page=${page}&limit=${limit}`);
        }

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error("Failed to fetch mangas:", error);
        return null;
    }
};

export const getMangaDetailsById = async (id = "") => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

export const getMangaPictures = async(id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/pictures`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
    }
};

export const getMangaCharacters = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/characters`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  export const getMangaRecommendations = async (id) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/manga/${id}/recommendations`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };