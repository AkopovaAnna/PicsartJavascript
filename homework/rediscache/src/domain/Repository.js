const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const repoSchema = new Schema({
    // id:{type:Number},
    name:{type:String},
    // url:{type:String},
    description:{type:String},
    // ownerId:{type:Number},
    // repos_url:{type:String},
});

// let Repo = mongoose.model("Repo", repoSchema);
// module.exports = {Repo};
module.exports = Repo = mongoose.model("repos", repoSchema);
// module.exports.repoSchema = mongoose.model('Repo', repoSchema);