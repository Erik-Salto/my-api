const { expect } = require('chai');
const Nconf = require('nconf');
const ServerConfig = require('../config/server');
const { initServer } = require('../utils/server');
const { validNewUser } = require('./data/user');

describe('Testing user handler', function () {
    let server, id;

    before(async () =>  {
        Nconf.use('memory');
        Nconf.set('server', ServerConfig);
        server = await initServer();
    });
    
    after(async () => {
        await server.stop();
    });
    
    it('Create User', async () => {
        const request = { method: 'POST', url: '/users', payload: validNewUser}
        const response = await server.inject(request);

        id = response.result.id;
        expect(response.statusCode).to.equal(200);
    });
    
    it('Call User List and verify created user is part of user list.', async () => {
        const request = { method: 'GET', url: `/users/${id}`};
        const response = await server.inject(request);

        expect(response.statusCode).to.equal(200);
    });

    it('Delete User', async () => {
        const request = { method: 'DELETE', url: `/users/${id}`}
        const response = await server.inject(request);

        expect(response.statusCode).to.equal(204);
    });
    
    it('Call User List and verify deleted user is no longer part of user list.', async () => {
        const request = { method: 'GET', url: `/users/${id}`}
        const response = await server.inject(request);

        expect(response.result.status).to.equal(404);
        expect(response.result.message).to.equal('resource not found');
    });   
});