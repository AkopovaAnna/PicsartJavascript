const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
    },

    dateCreated: {
        type: Date,
        default: Date.now,
    },

    dateUpdated: {
        type: Date,
    },

    images: [{
        filename: String,
        contentType: String,
        mimeType: String
    }],

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
        index: true
    }
});

module.exports = Post = mongoose.model("posts", postSchema);