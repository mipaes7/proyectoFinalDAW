const library = require('../models/library.models');

const readLibrariesController = async (req, res) => {
    let libraries;
    try {
        if (req.query.email || req.query.email == "") {
            libraries = await library.getLibraryByEmail(req.query.email);
            res.status(200).json(libraries);
        } else {
            libraries = await library.getAllLibraries();
            res.status(200).json(libraries);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createLibraryEntryController = async (req, res) => {
    const newEntry = req.body;
    if ("email" in newEntry && "title" in newEntry && "status" in newEntry) {
        try {
            const response = await library.createLibraryEntry(newEntry);
            res.status(201).json({
                items_created: response
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

const updateLibraryEntryStatusController = async (req, res) => {
    const updatedEntry = req.body;
    if ("email" in updatedEntry && "title" in updatedEntry && "status" in updatedEntry) {
        try {
            const response = await library.updateLibraryEntryStatus(updatedEntry);
            res.status(200).json({
                items_updated: response
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

const deleteEntryController = async (req, res) => {
    const entry = req.query;
    if ("email" in entry && "title" in entry) {
        try {
            const response = await library.deleteEntry(entry);
            res.status(200).json({
                items_deleted: response
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: "Faltan campos en la entrada" });
    }
};

module.exports = {
    readLibrariesController,
    createLibraryEntryController,
    updateLibraryEntryStatusController,
    deleteEntryController
};
