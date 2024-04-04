const { describe, it } = require('node:test');
const assert = require('node:assert');
const {captureEmail, captureUsername}  = require('./helpers')

describe('captureEmail', () => {
  it('should work', () => {
    assert.equal(captureEmail('Indeed help@indeed.com'), 'help@indeed.com');
  });

  it('should be ok', () => {
    assert.equal(captureEmail('Indeed <help@indeed.com>'), 'help@indeed.com');
  });

  // describe('a nested thing', () => {
  //   it('should work', () => {
  //     // assert.strictEqual(3, 3);
  //   });
  // });
});