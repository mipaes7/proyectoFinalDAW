const usersController = require('../controllers/users.controllers');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authVerify');

// GET http://localhost:3000/api/users
// GET http://localhost:3000/api/users?email=jonas@email.com
router.get('/', usersController.readUsersController);
// GET http://localhost:3000/api/users?user_id=3
router.get('/:id', usersController.readUsersByIdController);

// POST http://localhost:3000/api/users
router.post('/', usersController.createUserController);

// PUT http://localhost:3000/api/users
router.put('/', usersController.updateUserController);

// DELETE http://localhost:3000/api/users?email=jonas@email.com
router.delete('/', usersController.deleteUserController);

router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/verify", usersController.verifyAuth);

module.exports = router;