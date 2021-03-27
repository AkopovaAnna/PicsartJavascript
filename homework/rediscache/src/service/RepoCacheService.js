const redis = require('redis');
const bluebird = require('bluebird');
const Repo = require('../domain/Repository');

bluebird.promisifyAll(redis.RedisClient.prototype);

let redisSub = redis.createClient(process.env.REDISURL);
let redisClient = redis.createClient(process.env.REDISURL);

async function getReposCountFromCache() {
    try {
        return await redisClient.getAsync('reposCacheCount');
    } catch (err) {
        console.log(err)
    }

}

async function getReposCountFromDb() {
    let repoDBCount = await Repo.countDocuments({}, function (err, count) {
        console.log('Count is ' + count);
        return count
    });
    return repoDBCount;
}

async function getRepos() {
    const cachedReposCount = await getReposCountFromCache(redis);
    const dbReposCount = await getReposCountFromDb(Repo);
    if (cachedReposCount && cachedReposCount === dbReposCount.toString()) {
        return (cachedReposCount + " cached")
    } else {
        await redisClient.set('reposCacheCount', dbReposCount.toString());
        await redisClient.expire('reposCacheCount', 30);
        return dbReposCount;
    }
}


async function listenForRepoChanges() {

    await redisSub.on('message', async (channel, message) => {
        await updateCache(message);
    });

    await redisSub.subscribe('api-notify');
}

async function updateCache(count) {
    try {
        const cachedReposCount = await getReposCountFromCache(redis);
        if (cachedReposCount && cachedReposCount === count) {
            console.log("cached repos count " + cachedReposCount)
        } else {
            await redisClient.setAsync('reposCacheCount', count);
            await redisClient.expire('reposCacheCount', 30);
            console.log("repos db count " + count)
        }
    } catch (err) {
        console.log(err.message)
    }

}

module.exports = {
    getRepos: getRepos,
    listenForRepoChanges: listenForRepoChanges
};
