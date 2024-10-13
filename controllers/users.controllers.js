const user = require('../models/users.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt_secret = process.env.ULTRA_SECRET_KEY;

// Create User Controller
const createUserController = async (req, res) => {
    const newUser = req.body;

    if (
        "username" in newUser &&
        "email" in newUser &&
        "password" in newUser &&
        "isadmin" in newUser
    ) {
        try {
            const hashPassword = await bcrypt.hash(newUser.password, saltRounds);

            const userToCreate = {
                username: newUser.username,
                email: newUser.email,
                password: hashPassword,
                isadmin: newUser.isadmin,
                islogged: false 
            };

            const response = await user.createUser(userToCreate);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            console.log('Database Error:', error);
            res.status(500).json({ error: "Error in the Database" });
        }
    } else {
        res.status(400).json({ error: "All fields are required" });
    }
};

// Read Users Controller
const readUsersController = async (req, res) => {
    let users;
    try {
        if (req.query.email || req.query.email == "") {
            users = await user.getUserByEmail(req.query.email);
            res.status(200).json(users);
        } else {
            users = await user.getAllUsers();
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Controller
const updateUserController = async (req, res) => {
    const modifiedUser = req.body;
    if ("email" in modifiedUser) {
        try {
            const response = await user.updateUser(modifiedUser);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            res.status(500).json({ error: "Database error" });
        }
    } else {
        res.status(400).json({ error: "Email is required to update user details" });
    }
};

// Delete User Controller
const deleteUserController = async (req, res) => {
    let users;
    try {
        users = await user.deleteUser(req.query.email);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const data = await user.getUserByEmail(email);

        if (!data || data.length === 0) {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }

        const userData = data[0];

        const match = await bcrypt.compare(password, userData.password);

        if (match) {
            await user.setLoggedTrue(email);

            const userForToken = {
                email: userData.email,
                isadmin: userData.isadmin
            };

            const token = jwt.sign(userForToken, jwt_secret, { expiresIn: '20m' });

            res.cookie('token', token, { httpOnly: true, sameSite: 'none', maxAge: 20 * 60 * 1000 });
            // res.cookie('email', email, { httpOnly: true, sameSite: 'none', maxAge: 20 * 60 * 1000 });
            
            // console.log('Response headers:', res.getHeaders());

            res.status(200).json({
                msg: 'Correct authentication',
                token
            });
        } else {
            return res.status(400).json({ msg: 'Incorrect user or password' });
        }
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

// Logout Controller
const logout = async (req, res) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.token;
        console.log('token', token)

        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, jwt_secret);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        await user.setLoggedFalse(decoded.email);

        res.clearCookie('token');
        // res.clearCookie('email');

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.log('Error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createUserController,
    readUsersController,
    updateUserController,
    deleteUserController,
    login,
    logout
};
