import * as React from "react";
import { useState } from "react";
import useChosenWord from "../hooks/useChosenWord";
import useChosenWordSimple from "../hooks/useChosenWordSimple";
import Game from "./Game";

const Overview = () => {
  const [wordSet] = useState(false);
  const [word, setWord] = useState(null);
  const [gameInProgress, setGameInProgress] = useState(false);

  const newGame = () => {
    const newWord = getWord();
    setWord(newWord);
    const gameNow = true;
    setGameInProgress(gameNow);
  };

  const getWord = () => {
    return wordSet ? useChosenWordSimple() : useChosenWord();
  };

  const setWordSet = () => {
    return !wordSet;
  };

  if (!gameInProgress) {
    return (
      <>
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <h2>T9rget</h2>
            </div>
            <div className="col"></div>
          </div>
        </div>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onClick={setWordSet}
          ></input>
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Easy word set
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={newGame}>
          New Game
        </button>
      </>
    );
  }

  return (
    <>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexSwitchCheckDefault"
          onClick={setWordSet}
        ></input>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Easy word set
        </label>
      </div>
      <button type="button" className="btn btn-primary" onClick={newGame}>
        New Game
      </button>
      <Game word={word} />
    </>
  );
};

export default Overview;
