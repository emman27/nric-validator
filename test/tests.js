/*jshint expr: true*/
// This line allows expect clauses to pass jshint

const rewire = require('rewire'),
  expect = require('chai').expect;

const apiController = rewire('../controllers/api');

const isLocal = apiController.__get__('isLocal');

describe('First character tests', () => {
  describe('#isLocal', () => {
    it('Should accept S and T as local, and everything else as nonlocal', () => {
      expect(isLocal('S')).to.be.true;
      expect(isLocal('T')).to.be.true;
      expect(isLocal('S1234567D')).to.be.true;
      expect(isLocal('F')).to.be.false;
      expect(isLocal('1')).to.be.false;
      expect(isLocal('-1')).to.be.false;
    });
  });
});
