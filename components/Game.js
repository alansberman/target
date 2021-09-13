import * as React from "react";
import { useState, useEffect } from "react";

import useAllWords from "../hooks/useAllWords";
import Guess from "./Guess";
import Square from "./Square";
const Game = ({ word }) => {
  const [targetWord, setTargetWord] = useState(word);
  const [correctWords, setCorrectWords] = useState([]);
  const [randomSeed, setRandomSeed] = useState(0);
  const wordList = useAllWords();

  // thanks to https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const shuffleWord = () => {
    let w = targetWord.split("");

    for (let i = w.length - 1; i > 0; i--) {
      let j = Math.floor(randomSeed * (i + 1));
      let tmp = w[i];
      w[i] = w[j];
      w[j] = tmp;
    }
    return w;
  };

  const [shuffledWord, setShuffleWord] = useState(shuffleWord());

  const [firstThree, setFirstThree] = useState(shuffledWord.slice(0, 3));
  const [middleThree, setMiddleThree] = useState(shuffledWord.slice(3, 6));
  const [centreLetter, setCentreLetter] = useState(middleThree[1]);
  const [lastThree, setLastThree] = useState(shuffledWord.slice(6, 9));

  useEffect(() => {
    if (targetWord !== word) {
      setTargetWord(word);
      setRandomSeed(Math.random());
      setShuffleWord(shuffleWord());
      setFirstThree(() => shuffledWord.slice(0, 3));
      setMiddleThree(() => shuffledWord.slice(3, 6));
      setLastThree(() => shuffledWord.slice(6, 9));
      setCentreLetter(() => middleThree[1]);
      setCorrectWords(() => []);
    }
  }, [word]);

  const possibleWords = () => {
    // thanks to https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

    const targetWordCharCounts = shuffledWord.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    let eligibleWords = wordList.filter(item => {
      for (let character of item) {
        if (!targetWord.includes(character)) {
          return false;
        }
      }
      return item.includes(middleThree[1]);
    });

    eligibleWords = eligibleWords.filter(item => {
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

  function handleChildClick(word) {
    setCorrectWords([...correctWords, word]);
  }

  const possibleWordCount = possibleWords().length;
  const minScore = Math.floor(possibleWordCount * 0.2);
  const avgScore = Math.floor(possibleWordCount * 0.25);
  const highScore = Math.floor(possibleWordCount * 0.4);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col"></div>
        <div className="col">
          <h2>T9rget</h2>
        </div>
        <div className="col"></div>
      </div>
      <div className="row">
        {firstThree.map((item, index) => {
          return (
            <div className="col" key={`${item}${index}`}>
              <Square isCenterLetter={false} letter={item} />
            </div>
          );
        })}
      </div>
      <div className="row">
        {middleThree.map((item, index) => {
          return (
            <div className="col" key={`${item}${index}`}>
              <Square
                isCenterLetter={index === 1 ? true : false}
                letter={item}
              />
            </div>
          );
        })}
      </div>
      <div className="row">
        {lastThree.map((item, index) => {
          return (
            <div className="col" key={`${item}${index}`}>
              <Square isCenterLetter={false} letter={item} />
            </div>
          );
        })}
      </div>
      <Guess
        wordList={possibleWords}
        targetWord={targetWord}
        centre={centreLetter}
        min={minScore}
        avg={avgScore}
        high={highScore}
        onChildClick={handleChildClick}
        correctWords={correctWords}
      />
    </div>
  );
};

export default Game;
