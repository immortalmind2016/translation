const jsLevenshtein = require("js-levenshtein");

const calculate = function (inp, callback) {
  const [textOne, textTwo] = inp.split("#");
  callback(null, jsLevenshtein(textOne, textTwo));
};
module.exports = calculate;
