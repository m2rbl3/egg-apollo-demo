'use strict';

const mock = require('egg-mock');

describe('test/fetch-apollo-config.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/fetch-apollo-config-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, ')
      .expect(200);
  });
});
