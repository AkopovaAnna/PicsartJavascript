The redis cache api give an opportunity to cache data from monodb

whenever we load repos via script, the API notified that the repos inside mongo changed, so the API should immediately re-cache the data inside redis

this process is done by writing this command in terminal

# npm run dev

after that by usign this routes , the data from updated chache will be loaded:

# Endpoint
GET /api/repos/count

#
*PORT=3000
*DBURL=mongodb://localhost/repoDB
*REPOURL=https://api.github.com/search/repositories?q=something
*REDISURL=redis://127.0.0.1:6379
