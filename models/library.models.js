const pool = require('../config/db_pgsql');
const queries = require('../queries/library.queries');

const getAllLibraries = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllLibraries);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getLibraryByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getMangaEntriesByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createLibraryEntry = async (entry) => {
    const { email, title, status } = entry;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createLibraryEntry, [email, title, status]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateLibraryEntryStatus = async (entry) => {
    const { status, email, title } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateLibraryEntryStatus, [status, email, title]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const deleteEntry = async (entry) => {
    const { email, title } = entry;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteLibraryEntry, [email, title]);
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
    getAllLibraries,
    getLibraryByEmail,
    createLibraryEntry,
    updateLibraryEntryStatus,
    deleteEntry
};

// getAllLibraries().then(data => console.log(data));

// getLibraryByEmail('charlie.black@example.com').then(data => console.log(data));

// const newLibraryEntry = {
//     email: 'charlie.black@example.com',
//     title: 'Shigurui',
//     status: 'Reading'
// }

// createLibraryEntry(newLibraryEntry).then(data => console.log(data));

// const modifiedEntryStatus = {
//     "status": "Finished",
//     "email": "charlie.black@example.com",
//     "title": "Shigurui"
// }

// updateLibraryEntryStatus(modifiedEntryStatus).then(data => console.log(data));

// deleteEntry({
//     email: 'charlie.black@example.com',
//     title: 'Shigurui'
// }).then(data => console.log(data));