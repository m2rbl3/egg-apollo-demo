'use strict';

const fsPromise = require('fs').promises;
const path = require('path');

module.exports = class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    configWillLoad() {
    }

    configDidLoad() {
        
    }
};
