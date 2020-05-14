'use strict';

const client = require('./lib/Client/client');

module.exports = class AgentBootHook {
  // constructor(agent) {
  //   this.agent = agent;
  //   this.agent.registryClient = agent.cluster(client).create({});
  // }

  // async didLoad() {
  //   const {
  //     config: {
  //       apollo: params,
  //     },
  //   } = this.agent;
  //   await this.agent.registryClient.ready();
  //   this.agent.registryClient.publish(params);
  // }
};
