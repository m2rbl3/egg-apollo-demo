'use strict';

// const APIClient = require('./lib/Client/ApiClient');
// const RegistryClient = require('./lib/Client/RegistryClient');

/* module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;
    this.app.apiClient = new APIClient({ cluster: app.cluster });
  }

  async didLoad() {
    await this.app.apiClient.ready();
    this.app.apiClient.subscribe('sendApollo', data => {
      this.app.apolloConfigs = data;
    });
    this.app.apiClient.publish({
      key: 'fetchApollo',
    });
  }
}; */

/* module.exports = app => {
  app.apiClient = new APIClient(Object.assign({}, { cluster: app.cluster }));
  app.beforeStart(async () => {
    // console.log(app.apiClient.isReady);
    await app.apiClient.ready();
    app.apiClient.subscribe({ dataId: 'test.test' }, () => {
      console.log('test');
    });
  });
}; */

module.exports = class AppBootHook {
  constructor(app) {
    app.messenger.on('setApolloConfig', data => {
      app.config.apollo = data;
    });
  }
};