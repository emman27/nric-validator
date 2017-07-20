const express = require('express'),
  router = express.Router(),
  async = require('async'),
  cors = require('cors');

const isLocal = nric => nric.startsWith('S') || nric.startsWith('T');

const isForeign = nric => nric.startsWith('F') || nric.startsWith('G');

const isRecent = nric => nric.startsWith('T') || nric.startsWith('G');

const getNRICSum = (nric) => {
  const MULTIPLIERS = [2, 7, 6, 5, 4, 3, 2];
  let digits = Array.from(nric.slice(1, 8)),
    sum = 0;
  for (const [index, digit] of digits.entries()) {
    sum += parseInt(digit) * MULTIPLIERS[index];
  }
  if (isRecent(nric)) sum += FIRST_CHAR_BONUS;
  return sum;
};

const getLastChar = (nric) => {
  if (nric.length != 8 && nric.length != 9) {
    return false;
  }
  nric = nric.toUpperCase();
  const CHAR_MAP_LOCAL = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'],
    CHAR_MAP_FOREIGN = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'],
    FIRST_CHAR_BONUS = 4,
    MODULO = 11;

  const last_char = nric.charAt(nric.length - 1);

  const sum = getNRICSum(nric);

  if (isLocal(nric)) {
    return CHAR_MAP_LOCAL[sum % MODULO];
  } else if (isForeign(nric)) {
    return CHAR_MAP_FOREIGN[sum % MODULO];
  }
  return null;
};

const getFullNric = (nric) => {
  if (isValid(nric)) {
    return nric;
  }
  if (nric.length === 8 && getLastChar(nric)) {
    return nric + getLastChar(nric);
  }
  if (nric.length === 9 && getLastChar(nric.slice(0, 8))) {
    return nric.slice(0, 8) + getLastChar(nric);
  }
  return null;
};

const isValid = (nric) => {
  if (nric.length != 9) {
    return false;
  }
  nric = nric.toUpperCase(); // Seriously why drive yourself crazy
  const last_char = nric.charAt(nric.length - 1);
  return last_char == getLastChar(nric);
};

// router.post('/validate', (req, res) => {
//   res.json({nric: req.body.nric.toUpperCase(), valid: isValid(req.body.nric)});
// });

// router.post('/mass_validate', (req, res) => {
//   async.map(req.body.nrics, (nric, callback) => {
//     return callback(null, {
//       nric: nric,
//       valid: isValid(nric)
//     });
//   }, (err, results) => {
//     res.json({data: results});
//   });
// });

router.use(cors());

router.post('/autocomplete', (req, res) => {
  async.map(req.body.nrics, (nric, callback) => callback(null, {
    nric,
    full: getFullNric(nric),
    valid: isValid(nric),
  }), (err, results) => {
    res.json({ data: results });
  });
});

module.exports = router;
