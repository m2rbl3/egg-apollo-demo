'use strict';

const Base = require('sdk-base');
const { APIClientBase } = require('cluster-client');
const { getConfig } = require('../apollo');

class Client extends Base {
  constructor(options) {
    super({
      initMethod: 'init',
    });
    this._key = Symbol('egg-apollo');
    this._options = options;
    this._apolloRequestParams = {};
    this._config = {};
  }
  async init() {
    this.ready(true);
  }
  getConfig() {
    return this._config;  
  }
  subscribe(info, listener) {
    const {
      app,
    } = info;
    this.on(this._key, async () => {
      process.nextTick(() => {
        const config = this.getConfig();
        if (!config) {
          process.exit(1);
        }
        app.config.appolo.config = config;
      });
    });
  }
  publish(info) {
    const {
      params,
    } = info;
    this.emit(this._key, async () => {
      this._apolloRequestParams = params;
      this._config = await Promise.race([
        getConfig(this._apolloRequestParams),
        new Promise(res => setTimeout(() => res(null), 3000)),
      ]);
    });
  }
}

module.exports = class Api extends APIClientBase {
  get DataClient() {
    return Client;
  }
  subscribe(...params) {
    this._client.subscribe(...params);
  }

  publish(...params) {
    this._client.publish(...params);
  }
};
