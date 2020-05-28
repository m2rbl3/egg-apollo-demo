'use strict';

const Base = require('sdk-base');

class RegistryClient extends Base {
  constructor(options) {
    super({
      initMethod: 'init',
      ...options,
    });
  }

  async init() {
    this.ready(true);
    console.log(this.isReady);
  }

  subscribe(key, listener) {
    this.on(key, listener);
  }

  publish({ key, data }) {
    this.emit(key, data);
  }
}

module.exports = RegistryClient;
