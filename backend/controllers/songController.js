// songController.js
// Functions to use in router files.

const Song = require('../models/songModel');
const mongoose = require('mongoose');

// Get all songs that are marked as active sorted so newest is first.
const getSongs = async (req, res) => {
    const songs = await Song.find({active: true}).sort({createdAt: -1});
    res.status(200).json(songs);
};

// Get a single song.
const getSong = async (req, res) => {
    // Gives us the id from the request
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Song id does not exist"});
    }
    
    const song = await Song.findById(id);

    if (!song) {
        return res.status(404).json({error: "Song does not exist"});
    } else if (!song.active) {
        return res.status(404).json({error: "Song is not active"});
    }

    res.status(200).json(song);
};

// Create new song (code unused since user upload is not intended).
const createSong = async (req, res) => {
    const {song_name, song_url, comments, active} = req.body;

    try {
        // add doc to database
        const song = await Song.create({song_name, song_url, comments, active});
        res.status(200).json(song);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};

// Delete a song (code unused since song deletion by user is not intended).
const deleteSong = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Song id does not exist"});
    }

    const song = await Song.findOneAndDelete({_id: id});

    if (!song) {
        return res.status(404).json({error: "Song does not exist"});
    }

    res.status(200).json(song);
};

// Update a song (add a comment to a song's comment list)
// id is in url, ex) localhost:4000/api/songs/63f2bd482d13fc60172b607a
// req.body={"comment": "new comment wow"}
const updateSong = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Song id does not exist"});
    }

    // Pushes the string comment to the comments list for the song.
    const song = await Song.findOneAndUpdate({_id: id}, {$push: {comments: req.body}});

    if (!song) {
        res.status(404).json({error: "Song does not exist"});
    }

    res.status(200).json(song);
};

// Delete all comments for a specific song. Someone could exploit this, but I just need an easy
// way to delete the comments if someone spams or makes it past the profanity filter.
// id is in url, ex) localhost:4000/api/songs/63f2bd482d13fc60172b607a/admin_remove_comments
const deleteComments = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Song id does not exist"});
    }

    // Deletes comments for this song
    const song = await Song.findOneAndUpdate({_id: id}, {comments: []});

    if (!song) {
        res.status(404).json({error: "Song does not exist"});
    }

    res.status(200).json(song);
};

module.exports = {
    getSongs,
    getSong,
    createSong,
    deleteSong,
    updateSong,
    deleteComments
};