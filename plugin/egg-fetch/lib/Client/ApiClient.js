'use strict';

const APIClientBase = require('cluster-client').APIClientBase;
const RegistryClient = require('./RegistryClient');

class APIClient extends APIClientBase {
  // 返回原始的客户端类
  get DataClient() {
    return RegistryClient;
  }

  // 用于设置 cluster-client 相关参数，等同于 cluster 方法的第二个参数
  // get clusterOptions() {
  //   return {
  //     responseTimeout: 120 * 1000,
  //   };
  // }

  subscribe(...args) {
    return this._client.subscribe(...args);
  }

  publish(...args) {
    return this._client.publish(...args);
  }
}

module.exports = APIClient;
