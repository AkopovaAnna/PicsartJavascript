require('dotenv').config();
const express = require('express');
const redis = require('redis');
const Repo = require('./src/domain/Repository');
const dbConnection = require('./src/configs/dbConfig').connectDB;

const app = express();


// make a connection to the local instance of redis
const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);

client.on("error", (error) => {
    console.error(error);
});

async function getData() {
    let countR = 0;
    await dbConnection();
    await Repo.countDocuments({}, function (err, c) {
        console.log('Count is ' + c);
        countR =  c
    });

    console.log("REPOSSS COUNTTT " + countR)
    return countR;
}

function cache() {

    app.get('/repos/count', async (req, res) => {
        try {
            // let count = Repo.find();
            // console.log("REPO COUNT " + count.length)
            // const reposCacheCount = req.params.count;
            const reposCount = await getData();
            // console.log("GET DATA: " + reposCount)
            client.get('reposCacheCount', async (err, recipe) => {
                // console.log("CACHE"+reposCount)
                if (recipe && recipe === JSON.stringify(reposCount)) {
                    console.log("CASHED")
                    res.status(200).json({
                        error: false,
                        message: `Repos count for ${recipe} from the cache`,
                        data: JSON.parse(recipe)
                    })
                    // return res.status(200).send({
                    //     error: false,
                    //     message: `Repos count for ${reposCount} from the cache`,
                    //     data: JSON.parse(recipe)
                    // })
                } else { // When the data is not found in the cache then we can make request to the server

                    // const recipe = await axios.get(`http://www.recipepuppy.com/api/?q=${foodItem}`);

                    // save the record in the cache for subsequent request
                    // It expires in 5 hours
                    // let result = reposCount.then(r=> {
                    //     return r
                    // })

                    console.log("COUNT OF REPOS: " + reposCount)
                    client.set('reposCacheCount',reposCount);
                    client.expire('reposCacheCount', 10);
                    // client.set(reposCount, 1440, JSON.stringify(reposCount));

                    // return the result to the client
                    res.status(200).json({
                        error: false,
                        message: `Repos count for ${reposCount} from the server`,
                        data: reposCount
                    })

                    //recipe.data.results
                }
            })
        } catch (error) {
            console.log(error)
        }
    });
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port`);
    cache()
});

module.exports = app;