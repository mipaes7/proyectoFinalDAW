const mangaController = require('../controllers/mangas.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/mangas
router.get('/', mangaController.getAllMangasController);

// POST http://localhost:3000/api/mangas
router.post('/', mangaController.createMangaController);

// GET http://localhost:3000/api/mangas?author=norio
router.get('/author/:author', mangaController.getMangaByAuthorController);

// GET http://localhost:3000/api/mangas?genre=ecchi
router.get('/genre/:genre', mangaController.getMangaByGenreController);

// GET http://localhost:3000/api/mangas?title=shigurui
router.get('/title/:title', mangaController.getMangaByTitleController);

// PUT http://localhost:3000/api/mangas
router.put('/', mangaController.updateMangaController);

// DELETE http://localhost:3000/api/mangas?title=jonas@email.com
router.delete('/', mangaController.deleteMangaController);

// GET http://localhost:3000/api/mangas/reading/charlie.black@example.com
router.get('/reading/:email', mangaController.getAllReadingMangasController);

// GET http://localhost:3000/api/mangas/plan-to-read/charlie.black@example.com
router.get('/plan-to-read/:email', mangaController.getAllPlanToReadMangasController);

// GET http://localhost:3000/api/mangas/finished/charlie.black@example.com
router.get('/finished/:email', mangaController.getAllFinishedMangasController);

// GET http://localhost:3000/api/mangas/dropped/charlie.black@example.com
router.get('/dropped/:email', mangaController.getAllDroppedMangasController);

module.exports = router;