const userController = require('./controller/UserController');

const routes = [

    {
        method: 'GET',
        path: '/users',
        handler: userController.getAllUsers
    },
    {
        method: 'GET',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.getUserById
    },
    {
        method: 'GET',
        path: /users[?].+/,
        handler: userController.searchByQuery
    },

    {
        method: 'POST',
        path: '/users',
        handler: userController.createUser
    },
    {
        method: 'PUT',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.updateUser
    },
    {
        method: 'DELETE',
        path: /\/users\/([0-9a-z]+)/,
        handler: userController.deleteUser
    },
]

module.exports = routes;