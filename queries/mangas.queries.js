const mangaQueries = {
    // Read All mangas
    getAllMangas: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga;`,

    // Read manga by title
    getMangaByTitle: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE title ILIKE $1;`,

    // Read manga by genre
    getMangaByGenre: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE genres ILIKE $1;`,

    // Read manga by author
    getMangaByAuthor: `
    SELECT title, author, synopsis, cover_image_url, genres, themes
    FROM manga
    WHERE author ILIKE $1;`,

    //Read mangas with status reading
    getReadingMangas: `
    SELECT m.title, m.author, m.synopsis, m.cover_image_url, m.genres, m.themes
    FROM user_library AS l
    INNER JOIN users AS u ON u.user_id = l.user_id
    INNER JOIN manga AS m ON m.manga_id = l.manga_id
    WHERE l.status = 'Reading' AND u.email = $1;`,

    //Read mangas with status reading
    getPlanToReadMangas: `
    SELECT m.title, m.author, m.synopsis, m.cover_image_url, m.genres, m.themes
    FROM user_library AS l
    INNER JOIN users AS u ON u.user_id = l.user_id
    INNER JOIN manga AS m ON m.manga_id = l.manga_id
    WHERE l.status = 'Plan To Read' AND u.email = $1;`,

    //Read mangas with status reading
    getDroppedMangas: `
    SELECT m.title, m.author, m.synopsis, m.cover_image_url, m.genres, m.themes
    FROM user_library AS l
    INNER JOIN users AS u ON u.user_id = l.user_id
    INNER JOIN manga AS m ON m.manga_id = l.manga_id
    WHERE l.status = 'Dropped' AND u.email = $1;`,

    //Read mangas with status reading
    getFinishedMangas: `
    SELECT m.title, m.author, m.synopsis, m.cover_image_url, m.genres, m.themes
    FROM user_library AS l
    INNER JOIN users AS u ON u.user_id = l.user_id
    INNER JOIN manga AS m ON m.manga_id = l.manga_id
    WHERE l.status = 'Finished' AND u.email = $1;`,

    // Create a new manga
    createManga: `
    INSERT INTO manga (title, author, synopsis, cover_image_url, genres, themes)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,

    // Update the manga information
    updateManga: `
    UPDATE manga
    SET
    title = COALESCE($1, title),
    author = COALESCE($2, author),
    synopsis = COALESCE($3, synopsis),
    cover_image_url = COALESCE($4, cover_image_url),
    genres = COALESCE($5, genres),
    themes = COALESCE($6, themes)
    WHERE title = $7;`,

    // Delete the manga
    deleteManga: `
    DELETE FROM manga
    WHERE 
        title = $1;`
};

module.exports = mangaQueries;
