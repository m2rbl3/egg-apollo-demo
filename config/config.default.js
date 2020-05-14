/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1586916962569_9982';

  // add your middleware config here
  config.middleware = [];
  config.apollo = {
    configServerUrl: 'http://apollo-config.int.zuzuche.com',
    appId: 'CRD-m-web',
    clusterName: 'default',
    namespaceName: 'application',
    apolloEnv: 'PRO',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
