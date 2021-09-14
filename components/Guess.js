import * as React from "react";
import {useEffect, useState} from "react";
import GuessesList from "./GuessesList";

const Guess = ({
  word,
  wordList,
  centre,
  min,
  avg,
  high,
  onChildClick,
  correctWords
}) => {
  const [guess, setGuess] = useState("");
  const [correctCount, setCorrectCount] = useState(0);

  function onGuessKeyPress (event) {
    setGuess(event.target.value);
  }

  useEffect(() => {
    setCorrectCount(0)
  }, [word]);

  const [error, setError] = useState(null);

  const targetWordCharCounts = word.split("").reduce(function (acc, curr) {
    return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
  }, {});

  function handleGuessSubmit(event) {
    event.preventDefault();
    const isValid = isValidGuess();

    if (isValid) {
      onChildClick(guess);
      setGuess("");
    }
  }

  const isValidGuess = () => {
    if (guess.length < 4 || guess.length > 10) {
      setError("Words must be between 4 and 9 letters long");
      return false;
    }
    if (!guess.includes(centre)) {
      setError("Words must contain the centre letter");
      return false;
    }

    for (let character of guess) {
      if (!word.includes(character)) {
        setError("Words must only contain letters in the grid");
        return false;
      }
    }

    const wordCharCounts = guess.split("").reduce(function (acc, curr) {
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

    if (wordList.indexOf(guess) === -1) {
      setError(`${guess} is not a valid word`);
      return false;
    }

    if (correctWords.indexOf(guess) !== -1) {
      return false;
    }

    setGuess(guess);
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
        <form onSubmit={handleGuessSubmit}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="guessedWord"
              placeholder="Guess a word"
              aria-describedby="button-addon2"
              autoComplete="off"
              value={guess}
              onChange={onGuessKeyPress}
            />
            <button
              className="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Guess
            </button>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">😐 {min}</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">😎 {avg}</li>
          </ul>
        </div>
        <div className="col">
          <ul className="list-group list-group-horizontal">
            <li className="list-group-item">🥳 {high}</li>
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
