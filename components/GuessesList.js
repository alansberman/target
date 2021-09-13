import * as React from "react";
import { useState } from "react";

const GuessesList = ({ correctWords }) => {
  return (
    <>
      <div className="row">
        <div className="col">
          <ul className="list-group">
            {correctWords.map(item => {
              return (
                <li key={item} className="list-group-item">
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default GuessesList;
