
'use strict';

module.exports = app => {
  const schedule = {
    interval: '5s',
    type: 'worker',
    // disable: true,
  };

  return {
    schedule,
    async task(ctx) {
      app.apiClient.publish({
        key: 'test',
      });
    },
  };
};

const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      interval: '5s',
      type: 'worker',
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    console.log(this.app.apiClient.publish);
    this.app.apiClient.publish({
      key: 'test',
    });
  }
}

module.exports = UpdateCache;