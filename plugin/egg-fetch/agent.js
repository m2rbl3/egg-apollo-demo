'use strict';
const path = require('path');
const Apollo = require('./apollo.js');

// const apollo = path.resolve('./apollo.js');
// const APIClient = require('./lib/Client/ApiClient');
/* init超时，先不用该方案
module.exports = class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
    this.agent.apiClient = new APIClient({ cluster: agent.cluster });
  }

  async didLoad() {
    await this.agent.apiClient.ready();
    debug('has ready');
    this.agent.apiClient.subscribe('fetchApollo', () => {
      const data = await apollo();
      this.agent.apiClient.publish({
        key: 'sendApollo',
        data: data,
      });
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

module.exports = class AgentBootHook {
  constructor(agent) {
    this.Apollo = new Apollo();
    agent.messenger.on('fetchApolloConfig', async () => {
      console.log('test');
      agent.coreLogger.info(`[agent] 开始请求apollo配置`);
      try {
        const data = await this.Apollo.fetch();
        console.log(data)
      } catch (error) {
        console.error(error)
      }
      console.log(data);
      agent.coreLogger.info(`[agent] 请求apollo配置完成, data:\n${data}`);
      agent.messenger.sendToApp('setApolloConfig', data);
    });
  }
}