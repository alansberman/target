import * as React from "react";
import { useState, useEffect } from "react";

import useAllWords from "../hooks/useAllWords";
import Guess from "./Guess";
import Square from "./Square";


const shuffleWord = (word) => {
  let w = word.split("");

  for (let i = w.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = w[i];
    w[i] = w[j];
    w[j] = tmp;
  }
  return w;
};

const Game = ({ word }) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const [targetWord, setTargetWord] = useState(word);
  const [correctWords, setCorrectWords] = useState([]);
  const [shuffledWord, setShuffleWord] = useState(shuffleWord(word));
  const [firstThree, setFirstThree] = useState(shuffledWord.slice(0, 3));
  const [middleThree, setMiddleThree] = useState(shuffledWord.slice(3, 6));
  const [centreLetter, setCentreLetter] = useState(middleThree[1]);
  const [lastThree, setLastThree] = useState(shuffledWord.slice(6, 9));
  const wordList = useAllWords();

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const shuffledWord = shuffleWord(word)

    setTargetWord(word);
    setShuffleWord(shuffledWord);
    setFirstThree(shuffledWord.slice(0, 3));
    setMiddleThree(shuffledWord.slice(3, 6));
    setLastThree(shuffledWord.slice(6, 9));
    setCentreLetter(middleThree[1]);
    setCorrectWords([]);
  }, [word])

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
                isCenterLetter={index === 1}
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
