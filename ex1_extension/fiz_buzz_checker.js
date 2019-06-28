const checker = function(num) {
  if (num % 3 === 0 && num % 5 === 0) {
    return "FizzBuzz " + num;
  } else if (num % 3 === 0) {
    return "Fizz " + num;
  } else if (num % 5 === 0) {
    return "Buzz " + num;
  } else return "" + num;
};
module.exports = checker;
