const userController = require('./controller/UserController');

const routes = [

    {
        method: 'GET',
        path: '/user',
        handler: userController.getAllUsers
    },
    {
        method: 'GET',
        path: /\/user\/([0-9a-z]+)/,
        handler: userController.getUserById
    },
    {
        method: 'POST',
        path: '/user',
        handler: userController.createUser
    },
    {
        method: 'PUT',
        path: /\/user\/([0-9a-z]+)/,
        handler: userController.updateUser
    },
    {
        method: 'DELETE',
        path: /\/user\/([0-9a-z]+)/,
        handler: userController.deleteUser
    },
]

module.exports = routes;