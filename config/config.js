const Nconf = require('nconf');
const ServerConfig = require('./server');

const initConfig = async () => {
    Nconf.use('memory');
    Nconf.argv().env();

    Nconf.set('server', ServerConfig);
}

module.exports = { initConfig };