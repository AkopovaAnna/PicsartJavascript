require('dotenv').config();
const express = require('express');
const dbConnection = require('./src/configs/dbConfig').connectDB;

const reposController = require('./src/controller/RepoController');

const app = express();
dbConnection()

app.get('/api/repos/count', reposController.loadRepos);

function cacheProcess() {
    try {
        console.log("waiting publishing ")
        let listener = reposController.subscribeEvent();

    } catch (err) {
        console.log(err)
    }
}

cacheProcess();

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}...`);

});