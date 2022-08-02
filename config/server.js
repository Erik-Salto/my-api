'use strict';

module.exports = {
  server: {
    options: {
      port: 5001
    },
    swagger: {
      enabled: true,
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
