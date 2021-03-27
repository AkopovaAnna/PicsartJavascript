const reposService = require('../service/RepoCacheService')

async function loadRepos(req, res) {
    try {
        const response = await reposService.getRepos();
        console.log(response + " RESPONSE")
        await res.json({
            message: 'success',
            data: response
        });
    } catch (err) {
        await res.status(500).json({
            message: err
        })
    }
}

async function subscribeEvent() {
    try {
        await reposService.listenForRepoChanges();
    } catch (err) {
        console.log(err.message + " ")
    }
}

module.exports = {
    loadRepos: loadRepos,
    subscribeEvent: subscribeEvent
}