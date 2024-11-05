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
