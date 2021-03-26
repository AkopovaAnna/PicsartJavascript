require('dotenv').config();
const redis = require('redis');

// const cron = require('node-cron');
const axios = require('axios');
const Repo = require('../src/domain/Repository');
const dbConnection = require('../src/configs/dbConfig').connectDB;

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);


async function requestRepos() {
    console.log(1);
    const randomItems = [];
    let resp = await axios.get(process.env.REPOURL);
    // resp => {
    const items = resp.data.items;
    for (let i = 0; i < 5; i++) {
        randomItems[i] = items[Math.floor(Math.random() * items.length)]
    }
    return randomItems;
}

async function processRepos(repos) {
    console.log(2);
    return await repos.map(repo => ({
        name: repo.name,
        description: repo.description
    }))
}

async function saveRepo(mappedRepo) {
    console.log(3);
    for (const item of mappedRepo) {
        let repo = new Repo(item);
        console.log(repo.name + " repo NAME")

        await repo.save();
    }
}

// const task = cron.schedule('5 6 * * *', () => {
//     console.log('running a task every two hours between 8 a.m. and 5:58 p.m.');
(async () => {
    try {
        console.log("nter to script")
        await dbConnection();

        const repos = await requestRepos();
        const mappedRepos = await processRepos(repos);

        await saveRepo(mappedRepos);
        console.log("end to script")
        client.publish
        // publisher.publis("user-notify",JSON.stringify(user))
    } catch (err) {
        console.log(err)
    }

})()
// },
// {});

// task.start();


