const helpers = require("./helper")

module.exports = (req, res, routes) => {
    const route = routes.find((route) => {
        const methodMatch = route.method === req.method;
        let pathMatch = false;

        if (typeof route.path === 'object') {
            pathMatch = req.url.match(route.path);
        } else {
            pathMatch = route.path === req.url;
        }

        return pathMatch && methodMatch;
    });

    let param = null;

    if (route && typeof route.path === 'object') {
        param = req.url.match(route.path)[1];
    }

    if (route) {
        if (req.method === 'POST' || req.method === 'PUT') {
            req.on('data', buffer => {
                return route.handler(req, res, param, buffer.toString());
            });
        } else {
            return route.handler(req, res, param, null); //no body
        }
    }
    // else {
    //     return helpers.error(res, 'Endpoint not found', 404);
    // }
}