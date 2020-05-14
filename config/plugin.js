'use strict';
const path = require('path');

/** @type Egg.EggPlugin */
module.exports = {
  fetchApolloConfig: {
    enable: true,
    path: path.join(__dirname, '../plugin/egg-fetch'),
  },
};
