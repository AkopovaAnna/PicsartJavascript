const URL = require('url');

function getQueryParam(url, param_name) {
    let search = URL.parse(url).search;

    if (search) {
        let urlSearchParam = new URL.URLSearchParams(search);
        return urlSearchParam.get(param_name);
    }
}

function getPatchVariable(url) {
    return url.split('/').slice(-1).pop();
}

module.exports = {
    getQueryParam: getQueryParam,
    getPatchVariable: getPatchVariable
}