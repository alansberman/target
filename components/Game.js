import * as React from "react";
import { useState, useEffect } from "react";

import { possibleWords, shuffleWord } from "../helpers/wordFuncs";

import useAllWords from "../hooks/useAllWords";
import Guess from "./Guess";
import Square from "./Square";
const Game = ({ word }) => {
  const wordList = useAllWords();

  const [initialLoad, setInitialLoad] = useState(true);
  const [correctWords, setCorrectWords] = useState([]);
  const [shuffledWord, setShuffledWord] = useState(shuffleWord(word));
  const [centreLetter, setCentreLetter] = useState(shuffledWord[4]);
  const [possibleWordList, setPossibleWordList] = useState(possibleWords(shuffledWord, wordList));

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
      return;
    }

    const newShuffledWord = shuffleWord(word);
    setShuffledWord(newShuffledWord);
    setPossibleWordList(possibleWords(newShuffledWord, wordList));
    setCentreLetter(newShuffledWord[4]);
  }, [word]);

  function handleChildClick(word) {
    setCorrectWords([...correctWords, word]);
  }

  const possibleWordCount = possibleWordList.length;
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
