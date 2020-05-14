'use strict';

const { remoteConfigServiceFromCache } = require('node-apollo');
const { type } = require('./helper');

module.exports = {
  async getConfig(params) {
    const {
      configServerUrl,
      appId,
      clusterName,
      namespaceName,
      apolloEnv,
    } = params;
    const apolloConfig = {};
    if (type.isArray(namespaceName)) {
      await Promise.all(namespaceName.map(async namespaceName => {
        apolloConfig[namespaceName] = await remoteConfigServiceFromCache({
          configServerUrl,
          appId,
          clusterName,
          namespaceName,
          apolloEnv,
        });
      }));
    } else if (type.isString(namespaceName)) {
      apolloConfig[namespaceName] = await remoteConfigServiceFromCache({
        configServerUrl,
        appId,
        clusterName,
        namespaceName,
        apolloEnv,
      });
    }
    return apolloConfig;
  },
};
