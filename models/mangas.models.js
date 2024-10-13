const pool = require('../config/db_pgsql');
const queries = require('../queries/mangas.queries');

const getAllMangas = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllMangas);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getMangaByTitle = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getMangaByTitle, [`%${title}%`]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getMangaByGenre = async (genre) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getMangaByGenre, [`%${genre}%`]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getMangaByAuthor = async (author) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getMangaByAuthor, [`%${author}%`]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getAllReadingMangas = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getReadingMangas, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};
const getAllPlanToReadMangas = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getPlanToReadMangas, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getAllDroppedMangas = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getDroppedMangas, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getAllFinishedMangas = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getFinishedMangas, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createManga = async (manga) => {
    const { title, author, synopsis, cover_image_url, genres, themes } = manga;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createManga, [title, author, synopsis, cover_image_url, genres, themes]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateManga = async (manga) => {
    const { newTitle, author, synopsis, cover_image_url, genres, themes, title } = manga;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(
            queries.updateManga,
            [newTitle, author, synopsis, cover_image_url, genres, themes, title]
        );
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteManga = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteManga, [title]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

module.exports = {
    getAllMangas,
    getMangaByGenre,
    getMangaByTitle,
    getMangaByAuthor,
    getAllReadingMangas,
    getAllDroppedMangas,
    getAllFinishedMangas,
    getAllPlanToReadMangas,
    createManga,
    updateManga,
    deleteManga
};

// getAllMangas().then(data => console.log(data));
// getMangaByGenre('ecchi').then(data => console.log(data));
// getMangaByTitle('berserk').then(data => console.log(data));
// getMangaByAuthor('norio').then(data => console.log(data));

// const newManga = {
//     title: 'Shigurui',
//     author: 'Norio Nanjo',
//     synopsis: 'Samurais',
//     cover_image_url: 'img.jpg',
//     genres: 'seinen',
//     themes: 'historic, samurai'
// }

// createManga(newManga).then(data => console.log(data));

// const modifiedManga = {
//     synopsis: 'Samurais',
//     cover_image_url: 'img.jpg',
//     genres: 'seinen',
//     themes: 'historic, samurai, gore',
//     title: 'Shigurui'
// }

// updateManga(modifiedManga).then(data => console.log(data));

// deleteManga('Example Manga Title').then(data => console.log(data));