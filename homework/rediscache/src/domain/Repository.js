const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema({
    id: {type: Number},
    name: {type: String},
    url: {type: String},
    description: {type: String},
    forks: {type: Number},
    repos_url: {type: String},
    created_at: {type: Date},
});

module.exports = Repo = mongoose.model("repos", repoSchema);