'use strict';

const { setEnv } = require('node-apollo');

module.exports = {
  fetchApollo: {
    getConfig() {
      if (!process.env.apolloConfig) {
        setEnv();
      }
      return JSON.parse(process.env.apolloConfig);
    }
  },
};