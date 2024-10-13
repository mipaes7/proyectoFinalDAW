const libraryQueries = {
    // Read All libraries INNER JOIN users AND manga
    getAllLibraries: `
    SELECT u.username, u.email, m.title, l.status
    FROM user_library AS l
    INNER JOIN users AS u
    ON u.user_id = l.user_id
    INNER JOIN manga AS m
    ON m.manga_id = l.manga_id;`,

    // Read all manga entries by user's email
    getMangaEntriesByEmail: `
    SELECT l.*, u.email, m.title 
    FROM user_library l
    JOIN users u ON l.user_id = u.user_id
    JOIN manga m ON l.manga_id = m.manga_id
    WHERE u.email = $1;`,

    // Create a new library entry
    createLibraryEntry: `
    INSERT INTO user_library (user_id, manga_id, status)
    VALUES ((SELECT user_id FROM users WHERE email=$1), (SELECT manga_id FROM manga WHERE title=$2), $3) RETURNING *;`,

    // Update status of a manga entry
    updateLibraryEntryStatus: `
    UPDATE user_library
    SET status = $1
    WHERE user_id = (SELECT user_id FROM users WHERE email = $2)
    AND manga_id = (SELECT manga_id FROM manga WHERE title = $3);`,

    // Delete manga entry from user's library
    deleteLibraryEntry: `
    DELETE FROM user_library
    WHERE user_id = (SELECT user_id FROM users WHERE email = $1)
    AND manga_id = (SELECT manga_id FROM manga WHERE title = $2);`
};

module.exports = libraryQueries;
