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
  
  describe('captureUsername', () => {
    it('should work', () => {
      assert.equal(captureUsername('Indeed <help@indeed.com>'), 'Indeed');
    });
  });
});