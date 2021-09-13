import * as React from "react";
import { useState, useEffect } from "react";

import useAllWords from "../hooks/useAllWords";
import Guess from "./Guess";
import Square from "./Square";
const Game = ({ word }) => {
  const [correctWords, setCorrectWords] = useState([]);

  const wordList = useAllWords();

  // thanks to https://stackoverflow.com/questions/3943772/how-do-i-shuffle-the-characters-in-a-string-in-javascript
  const shuffleWord = () => {
    let w = word.split("");

    for (let i = w.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = w[i];
      w[i] = w[j];
      w[j] = tmp;
    }
    return w;
  };

  const [shuffledWord, setShuffledWord] = useState(shuffleWord());
  const [centreLetter, setCentreLetter] = useState(shuffledWord[4]);

  useEffect(() => {
    setShuffledWord(shuffleWord());
  }, [word]);

  useEffect(() => {
    setCentreLetter(shuffledWord[4]);
  }, [shuffledWord]);

  useEffect(() => {
    setPossibleWordList(possibleWords());
  }, [word]);

  const possibleWords = () => {
    // thanks to https://stackoverflow.com/questions/5667888/counting-the-occurrences-frequency-of-array-elements

    const targetWordCharCounts = shuffledWord.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    let eligibleWords = wordList
      .filter(item => {
        for (let character of item) {
          if (!word.includes(character)) {
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

  const [possibleWordList, setPossibleWordList] = useState(possibleWords());

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
        {shuffledWord.map((item, index) => {
          return (
            <div className="col-4" key={`${item}${index}`}>
              <Square isCenterLetter={index === 4} letter={item} />
            </div>
          );
        })}
      </div>
      <Guess
        word={word}
        wordList={possibleWordList}
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
