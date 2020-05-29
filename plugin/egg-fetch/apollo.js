'use strict';

const nodeApollo = require('node-apollo');
const path = require('path');
const EGG_SERVER_ENV = process.env.EGG_SERVER_ENV || 'test';

class Apollo {
    constructor(options) {
        this._options = options;
        this._config = this.getConfig();
        this._defaultConfig = {
            clusterName: 'default',
            namespaceName: 'application'
        };
        this.fetchFromCache = this.fetch('cache');
        this.fetch = this.fetch();
    }

    fetch(type) {
        type = type === 'cache'
            ? 'From'
            : 'Skip';

        if (Array.isArray(this._config)) {
            return async () => {
                return (await Promise.allSettled(this._config.map((config) => {
                    return this[`remoteConfigService${type}Cache`](config);
                }))).reduce((result, { status, value }, i) => status == 'fulfilled'
                    ? Object.assign(result, value)
                    : result
                    , {})
            }
        } else {
            return () => this[`remoteConfigService${type}Cache`](this._config);
        }
    }

    async remoteConfigServiceFromCache(config) {
        try {
            const result = await nodeApollo.remoteConfigServiceFromCache({
                ...this._defaultConfig,
                ...config
            });
            if (result) {
                if (result.status === 200) {
                    const {
                        appId,
                        namespaceName
                    } = config;
                    return {
                        [`${appId}.${namespaceName}`]: result.data
                    };
                } else if (result.status === 304) {
                    console.log(`[ apollo ] - 暂无更新`);
                } else {
                    throw new Error(`\nstatus Code异常: ${JSON.stringify(result)}`);
                }
            }
        } catch (e) {
            console.error(e)
            throw e;
        }
    }

    async remoteConfigServiceSkipCache(config) {
        try {
            const result = await nodeApollo.remoteConfigServiceSkipCache({
                ...this._defaultConfig,
                ...config
            });
            if (result) {
                const {
                    appId,
                    namespaceName
                } = config;
                return {
                    [`${appId}.${namespaceName}`]: result
                };
            } else {
                throw new Error(`请求异常${JSON.stringify(result)}`);
            }
        } catch (e) {
            throw e;
        }
    }
    getConfig() {
        const apolloConfig = require(path.resolve(`./config/apollo.${EGG_SERVER_ENV}.js`));

        return apolloConfig;
    }
}

module.exports = Apollo;
