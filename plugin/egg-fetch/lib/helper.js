'use strict';

exports.type = {
  isType(val, type) {
    return this.getType(val) === type;
  },
  getType(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
  },
  isArray(val) {
    return this.isType(val, 'Array');
  },
  isString(val) {
    return this.isType(val, 'String');
  },
  isObject(val) {
    return this.isType(val, 'Object');
  },
};

// exports.default
