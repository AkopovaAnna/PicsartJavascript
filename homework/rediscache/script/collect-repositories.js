require('dotenv').config();

const redis = require('redis');
const axios = require('axios');

const Repo = require('../src/domain/Repository');
const dbConnection = require('../src/configs/dbConfig').connectDB;

const redisPub = redis.createClient(process.env.REDISURL);


//load data from git url
async function requestRepos() {
    const randomRepoItems = [];
    let resp = await axios.get(process.env.REPOURL);
    const items = resp.data.items;
    for (let i = 0; i < 5; i++) {
        randomRepoItems[i] = items[Math.floor(Math.random() * items.length)]
    }
    return randomRepoItems;
}

//map loaded repos to object
async function mapRepos(repos) {
    return await repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        url: repo.url,
        description: repo.description,
        forks: repo.forks,
        repos_url: repo.owner.repos_url,
        created_at: repo.created_at
    }))
}

//saved mapped repos
async function saveRepo(mappedRepo) {

    for (const item of mappedRepo) {
        let repo = new Repo(item);
        await repo.save();
    }
}

async function publishLoadToDB() {
    let reposCount = await Repo.countDocuments({}, function (err, count) {
        console.log('Count is ' + count);
        return count;
    });

    await redisPub.publish("api-notify", reposCount.toString());

}

(async () => {
    try {
        await dbConnection();

        const repos = await requestRepos();
        const mappedRepos = await mapRepos(repos);

        await saveRepo(mappedRepos);

        await publishLoadToDB();
    } catch (err) {
        console.log(err)
    }
})()


