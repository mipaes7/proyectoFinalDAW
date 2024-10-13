const userQueries = {
    // Read All users
    getAllUsers: `
    SELECT username, email, password, isadmin, islogged
    FROM users;`,

    //Read user by email
    getUserByEmail: `
    SELECT username, email, password, isadmin, islogged
    FROM users
    WHERE email = $1`,

    // Create a new user
    createUser: `
    INSERT INTO users (username, email, password, isadmin, islogged)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;`,

    // Update user by email
    updateUserByEmail: `
    UPDATE users
    SET
    username = COALESCE($1, username),
    password = COALESCE($2, password),
    isadmin = COALESCE($3, isadmin),
    islogged = COALESCE($4, islogged)
    WHERE email = $5;`,

    // Toggle islogged field
    setLoggedTrue: `
    UPDATE users
    SET islogged = true
    WHERE email = $1
    RETURNING *;`,

    setLoggedFalse: `
    UPDATE users
    SET islogged = false
    WHERE email = $1
    RETURNING *;`,

    // Delete the user by email
    deleteUserByEmail: `
    DELETE FROM users
    WHERE 
        email = $1;`
};

module.exports = userQueries;
