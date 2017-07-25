/* jshint expr: true*/
// This line allows expect clauses to pass jshint

const rewire = require('rewire'),
  expect = require('chai').expect;

const apiController = rewire('../controllers/api');

const isLocal = apiController.__get__('isLocal');
const isForeign = apiController.__get__('isForeign');
const isRecent = apiController.__get__('isRecent');
const getFullNric = apiController.__get__('getFullNric');
const isValid = apiController.__get__('isValid');

describe('First character tests', () => {
  describe('#isLocal', () => {
    it('Should accept S and T as local, and everything else as nonlocal', () => {
      expect(isLocal('S')).to.be.true;
      expect(isLocal('T')).to.be.true;
      expect(isLocal('S1234567D')).to.be.true;
      expect(isLocal('F1234567D')).to.be.false;
      expect(isLocal('F')).to.be.false;
      expect(isLocal('1')).to.be.false;
      expect(isLocal('-1')).to.be.false;
    });
  });

  describe('#isForeign', () => {
    it('Should accept F and G as foreign, and everything else is false', () => {
      expect(isForeign('F')).to.be.true;
      expect(isForeign('G')).to.be.true;
      expect(isForeign('F1234567D')).to.be.true;
      expect(isForeign('S1234567D')).to.be.false;
      expect(isForeign('S')).to.be.false;
      expect(isForeign('1')).to.be.false;
      expect(isForeign('-1')).to.be.false;
    });
  });

  describe('#isRecent', () => {
    it('Should accept G and T as recent (post 2000), and everything else is false', () => {
      expect(isRecent('T')).to.be.true;
      expect(isRecent('G')).to.be.true;
      expect(isRecent('T1234567D')).to.be.true;
      expect(isRecent('S1234567D')).to.be.false;
      expect(isRecent('S')).to.be.false;
      expect(isRecent('1')).to.be.false;
      expect(isRecent('-1')).to.be.false;
    });
  });

  describe('Integration Tests', () => {
    it('Should work perfectly!', () => {
      expect(getFullNric('S1234567')).to.equal('S1234567D');
      expect(getFullNric('S0000001')).to.equal('S0000001I'); // Yusof bin Ishak
      expect(getFullNric('S0000002')).to.equal('S0000002G'); // Wee Chong Jin
      expect(getFullNric('S0000003')).to.equal('S0000003E'); // Lee Kwan Yew
      expect(getFullNric('S0000004')).to.equal('S0000004C'); // Kwa Geok Choo
      expect(getFullNric('S0000005')).to.equal('S0000005A'); // Toh Chin Chye
      expect(getFullNric('S0000006')).to.equal('S0000006Z'); // Goh Keng Swee
      expect(getFullNric('S0000007')).to.equal('S0000007H'); // S Rajaratnam
    });

    it('Should check validity of NRIC by length and checksum', () => {
      expect(isValid('S0000001I')).to.be.true;
      expect(isValid('S0000001')).to.be.false;
      expect(isValid('S0000001D')).to.be.false;
    });

    it('Should return correct  value of NRIC if wrong', () => {
      expect(getFullNric('S1234567B')).to.equal('S1234567D');
    });

    it('Should also work for new NRIC / FIN numbers', () => {
      expect(getFullNric('G1234567D')).to.equal('G1234567X');
      expect(getFullNric('T1234567D')).to.equal('T1234567J');
    });
  });
});
