const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            default : ''
        },
        director: {
            type: String,
            required: true,
            default : ''
        },
        releaseYear: {
            type: String,
            required: true,
            default : ''
        },
    },
    {
        timestamps: { createdAt: true, updatedAt: true },
    }
);

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
