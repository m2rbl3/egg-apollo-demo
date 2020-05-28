'use strict';

const path = require('path');
const APIClient = require('./lib/Client/ApiClient');
const apollo = path.resolve('./apollo.js');

module.exports = class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
    this.agent.apiClient = new APIClient({ cluster: this.agent.cluster });
  }

  async didLoad() {
    await this.agent.apiClient.ready(true);
    // this.agent.apiClient.subscribe('fetchApollo', () => {
    //   try {
    //     const data = await apollo();
    //     this.agent.apiClient.publish({
    //       key: 'sendApollo',
    //       data: data,
    //     });
    //   } catch (error) {

    //   }
    // });
    // this.agent.apiClient.publish({
    //   key: 'test',
    // });
    this.agent.apiClient.subscribe('test', () => {
      console.log('agent subscribe');
    });
  }
};
