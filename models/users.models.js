const pool = require("../config/db_pgsql");
const queries = require("../queries/users.queries");

const getUserByEmail = async (email) => {
    let client, result;
    try{
        client = await pool.connect();
        const data = await client.query(queries.getUserByEmail, [email]);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllUsers);
        result = data.rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const createUser = async (user) => {
    const { username, email, password, isadmin } = user;
    const islogged = false;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createUser, [username, email, password, isadmin, islogged]);
        result = data.rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
};

const updateUser = async (user) => {
    const { username, password, isadmin, islogged, email } = user;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(
            queries.updateUserByEmail,
            [username, password, isadmin, islogged, email]
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

const setLoggedTrue = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.setLoggedTrue, [email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

const setLoggedFalse = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.setLoggedFalse, [email]);
        result = data.rowCount;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        client.release();
    }
    return result;
};

const deleteUser = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteUserByEmail, [email]);
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
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
    setLoggedTrue,
    setLoggedFalse,
    deleteUser
}

// getAllUsers().then(data => console.log(data));
// getUserByEmail('jonasmail@mail.com').then(data => console.log(data));

// const newUser = {
//     "username": "Jonás2",
//     "email": "jonas@email.com",
//     "password": "jonipass",
//     "isadmin": false
// }
// createUser(newUser).then(data => console.log(data));

// const modifiedUser = {
    // username: 'Jonás5',
    // password: 'jonipassword',
    // isadmin: true,
    // islogged: true,
    // email: 'jonas@email.com'
// }

// updateUser(modifiedUser).then(data => console.log(data));

// setLoggedTrue('jonas@email.com').then(data => console.log(data));
// setLoggedFalse('jonas@email.com').then(data => console.log(data));

// deleteUser('bob.brown@example.com').then(data => console.log(data));