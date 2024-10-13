const manga = require('../models/mangas.models');

const getAllMangasController = async (req, res) => {
    try {
        const mangas = await manga.getAllMangas();
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMangaByTitleController = async (req, res) => {
    const { title } = req.params;
    try {
        const mangas = await manga.getMangaByTitle(title);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMangaByGenreController = async (req, res) => {
    const { genre } = req.params;
    try {
        const mangas = await manga.getMangaByGenre(genre);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMangaByAuthorController = async (req, res) => {
    const { author } = req.params;
    try {
        const mangas = await manga.getMangaByAuthor(author);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createMangaController = async (req, res) => {
    const newManga = req.body;
    if ("title" in newManga && "author" in newManga && "synopsis" in newManga && "cover_image_url" in newManga && "genres" in newManga && "themes" in newManga) {
        try {
            const response = await manga.createManga(newManga);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Database error" });
        }
    } else {
        res.status(400).json({ error: "All fields are required" });
    }
};

const getAllReadingMangasController = async (req, res) => {
    const { email } = req.params;
    try {
        const mangas = await manga.getAllReadingMangas(email);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPlanToReadMangasController = async (req, res) => {
    const { email } = req.params;
    try {
        const mangas = await manga.getAllPlanToReadMangas(email);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllFinishedMangasController = async (req, res) => {
    const { email } = req.params;
    try {
        const mangas = await manga.getAllFinishedMangas(email);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllDroppedMangasController = async (req, res) => {
    const { email } = req.params;
    try {
        const mangas = await manga.getAllDroppedMangas(email);
        res.status(200).json(mangas);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateMangaController = async (req, res) => {
    const modifiedManga = req.body;
    if ("title" in modifiedManga) {
        try {
            const response = await manga.updateManga(modifiedManga);
            res.status(201).json({
                items_updated: response
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: "Database error" });
        }
    } else {
        res.status(400).json({ error: "Title is required to update manga details" });
    }
};

const deleteMangaController = async (req, res) => {
    const { title } = req.params;
    try {
        const response = await manga.deleteManga(title);
        res.status(200).json({
            items_deleted: response
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = {
    getAllMangasController,
    getMangaByTitleController,
    getMangaByGenreController,
    getMangaByAuthorController,
    getAllReadingMangasController,
    getAllPlanToReadMangasController,
    getAllFinishedMangasController,
    getAllDroppedMangasController,
    createMangaController,
    updateMangaController,
    deleteMangaController
};