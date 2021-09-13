import * as React from "react";
import { useState } from "react";
import GuessesList from "./GuessesList";

const Guess = ({
  targetWord,
  wordList,
  centre,
  min,
  avg,
  high,
  onChildClick,
  correctWords
}) => {
  const [target] = useState(targetWord);
  const [possibleWordList] = useState(wordList);

  const [minScore] = useState(min);
  const [averageScore] = useState(avg);
  const [highScore] = useState(high);
  const [guess, setGuess] = useState("");
  const [centreLetter] = useState(centre);
  const [correctCount, setCorrectCount] = useState(0);

  const [error, setError] = useState(null);

  const targetWordCharCounts = target.split("").reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  function handleClick(event) {
    const isValid = isValidGuess();
    if (isValid) {
      onChildClick(document.getElementById("guessedWord").value);
    }
  }

  const isValidGuess = () => {
    const guessInput = document.getElementById("guessedWord").value;
    if (guessInput.length < 4 || guessInput.length > 10) {
      setError("Words must be between 4 and 9 letters long");
      return false;
    }
    if (!guessInput.includes(centreLetter)) {
      console.log(guessInput, centreLetter);
      setError("Words must contain the centre letter");
      return false;
    }

    for (let character of guessInput) {
      if (!target.includes(character)) {
        setError("Words must only contain letters in the grid");
        return false;
      }
    }

    const wordCharCounts = guessInput.split("").reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});

    for (const [key, value] of Object.entries(wordCharCounts)) {
      if (value > targetWordCharCounts[key]) {
        setError(
          "Words cannot have more instances of a letter than in the grid"
        );
        return false;
      }
    }

    if (possibleWordList.indexOf(guessInput) === -1) {
      setError(`${guessInput} is not a valid word`);
      return false;
    }

    if (correctWords.indexOf(guessInput) !== -1) {
      return false;
    }

    setGuess(guessInput);
    // setCorrectWords([guessInput, ...correctWords]);
    setError(null);
    setCorrectCount(correctCount + 1);
    return true;
  };

  return (
    <>
      {error && (
        <div className="row">
          <div className="col">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            id="guessedWord"
            placeholder="Guess a word"
            aria-describedby="button-addon2"
          ></input>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleClick}
          >
            Guess
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">😐 {minScore}</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">😎 {averageScore}</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">🥳 {highScore}</li>
          </ul>
        </div>
      </div>
      <br></br>
      {correctCount > 0 && (
        <div className="row">
          <div className="col">
            <div className="alert alert-success" role="alert">
              Words Identified: {correctCount}
            </div>
          </div>
        </div>
      )}
      <GuessesList correctWords={correctWords} />
    </>
  );
};

export default Guess;
