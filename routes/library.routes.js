const libraryController = require('../controllers/library.controllers');
// const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();

// GET http://localhost:3000/api/libraries
// GET http://localhost:3000/api/libraries?email=exampleuser@example.com
router.get('/', libraryController.readLibrariesController);

// GET http://localhost:3000/api/libraries/3
router.get('/:id', libraryController.readLibrariesByUserIdController);

// POST http://localhost:3000/api/libraries
router.post('/', libraryController.createLibraryEntryController);

// PUT http://localhost:3000/api/libraries
router.put('/', libraryController.updateLibraryEntryStatusController);

// DELETE http://localhost:3000/api/libraries
router.delete('/', libraryController.deleteEntryController);

module.exports = router;

