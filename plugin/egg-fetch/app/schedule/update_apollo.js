  
'use strict';

const apollo = require('node-apollo');
const path = require('path');

module.exports = app => {
  const schedule = Object.assign({
    interval: '1m',
    type: 'worker',
    disable: true
  }, app.config.apollo)

  return {
    schedule,
    async task(ctx) {
      const apolloConfig = require(path.join(app.config.baseDir, 'config/apollo.js'));

      const result = await apollo.remoteConfigServiceSikpCache(apolloConfig);
      if (result && result.status === 304) {
        app.coreLogger.info(`[ apollo ] - 暂无更新`);
      } else {
        apollo.createEnvFile(result);
        apollo.setEnv();

        const {
          appInfo
        } = app.config;
        const updateConfig = require(path.join(app.config.baseDir, 'config/config.default.js'))(appInfo);
        Object.assign(app.config, updateConfig);
        app.coreLogger.info(`[ apollo ] - 更新完成`);
      }
    },
  };
};