
'use strict';

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '10s',
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    // console.log(this.app.apiClient.publish);
    // this.app.apiClient.publish({
    //   key: 'test',
    // });
    // console.log('test1')
    this.app.messenger.sendToAgent('fetchApolloConfig');
  }
}

module.exports = UpdateCache;