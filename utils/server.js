'use strict';

const FtHapi = require('@asurion/ftp-ft-hapi');
const Config = require('nconf');
//const Logger = require('./logger');
const routes = require('../routes');

const internals = {
  server: null
};

const initServer = async () => {
  internals.server = await FtHapi.init(Config.get('server'));
  await FtHapi.addRoutes(internals.server, routes);
  await internals.server.start();
  //Logger.console(`Server started on: ${internals.server.info.uri}`);
};

module.exports = { initServer };