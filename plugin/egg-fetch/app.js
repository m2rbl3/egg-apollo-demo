'use strict';

const client = require('./lib/Client/client');


module.exports = class AppBootHook {
  // constructor(app) {
  //   this.app = app;
  //   this.app.registryClient = app.cluster(client).create({});
  // }
  // async didLoad() {
  //   await this.app.registryClient.ready();
  //   this.app.registryClient.subscribe({
  //     app: this.app,
  //   }, () => { });
  // }
};
