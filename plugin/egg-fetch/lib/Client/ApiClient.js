const APIClientBase = require('cluster-client').APIClientBase;
const RegistryClient = require('./RegistryClient');

class APIClient extends APIClientBase {
  // 返回原始的客户端类
  get DataClient() {
    return RegistryClient;
  }

  // 用于设置 cluster-client 相关参数，等同于 cluster 方法的第二个参数
  get clusterOptions() {
    return {
      responseTimeout: 120 * 1000,
    };
  }

  subscribe(reg, listener) {
    this._client.subscribe(reg, listener);
  }

  publish(reg) {
    this._client.publish(reg);
  }

  get(key) {
    return this._cache[key];
  }
}

module.exports = APIClient;