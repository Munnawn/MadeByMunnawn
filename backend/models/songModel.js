const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// songSchema defines the structure of song documents in the database
const songSchema = new Schema({
    song_name: {type: String, required: true},
    song_url: {type: String, required: true},
    comments: [{
        comment_text: {type: String, required: true}, 
        comment_date:{type: String, required: true}
      }],
    active: {type: Boolean, required: true}
}, { timestamps: true });

// Schema is applied to the model. Use model to interact with the songs collection.
module.exports = mongoose.model('Song', songSchema);