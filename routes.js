const handler = require('./handler/user/user');
const routes = [
    {
        method: ['GET', 'POST', 'DELETE'],
        path: '/users/{id?}',
        options: {
            handler: handler
        }
    }
]
module.exports =  routes 