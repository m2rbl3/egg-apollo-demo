'use strict';

const apollo = require('node-apollo');
const fs = require('fs');
const path = require('fs');
const EGG_SERVER_ENV = process.env.EGG_SERVER_ENV;

class NodeApollo {
    constructor(options) {
        this._options = options;
        this._config = this.getConfig();
    }
    remoteConfigServiceFromCache(config) {
        const result = await apollo.remoteConfigServiceSikpCache({
            ...this._config,
            ...config,
        });
        if (result && result.status === 304) {
            app.coreLogger.info(`[ apollo ] - 暂无更新`);
        } else {
            return result;
        }
    }
    getConfig() {
        const apolloConfig = require(path.resolve(`./config/apollo.${EGG_SERVER_ENV}.js`));
        const {
            key,
        } = this._options;
        const {
            [key]: config,
        } = apolloConfig;
        return config;
    }
}

module.exports = NodeApollo;
