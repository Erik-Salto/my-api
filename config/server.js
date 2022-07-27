'use strict';

module.exports = {
  server: {
    options: {
      port: 5001
    },
    swagger: {
      enabled: process.env.SWAGGER_ENABLED === 'true',
      options: {
        documentationPath: '/docs',
        auth: false,
        info: {
          title: 'my-api'
        }
      }
    }
  }
};
