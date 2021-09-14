// thanks to https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
const shuffleWord = word => {
  let w = word.split("");

  for (let i = w.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = w[i];
    w[i] = w[j];
    w[j] = tmp;
  }
  return w;
};

const possibleWords = (shuffledWord, wordList) => {
  // thanks to https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

  const targetWordCharCounts = shuffledWord.reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  let eligibleWords = wordList
    .filter(item => {
      for (let character of item) {
        if (!shuffledWord.includes(character)) {
          return false;
        }
      }
      return item.includes(shuffledWord[4]);
    })
    .filter(item => {
      const wordCharCounts = item.split("").reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {});
      for (const [key, value] of Object.entries(wordCharCounts)) {
        if (value > targetWordCharCounts[key]) {
          return false;
        }
      }
      return true;
    });

  return eligibleWords;
};

module.exports = { possibleWords, shuffleWord };
