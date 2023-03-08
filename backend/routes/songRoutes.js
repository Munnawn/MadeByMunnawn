// songs.js
// Handles request routing for songs endpoint.

const express = require('express');
const router = express.Router();
const Song = require('../models/songModel');
const {
    getSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong,
    deleteComments
} = require('../controllers/songController');

// Get all active songs.
router.get('/', getSongs);

// Get a single song. :id is a route parameter that can change.
router.get('/:id', getSong);

// Post a new song. Code unused because at this time, I do not want to allow user upload.
router.post('/', createSong);

// Delete a song. (unused because song deletion by user not intended).
router.delete('/:id', deleteSong);

// Update a song
router.patch('/:id', updateSong);

// Delete a song's comments
router.patch('/:id/admin_remove_comments', deleteComments);

// Finished creating all routes, so export.
module.exports = router;