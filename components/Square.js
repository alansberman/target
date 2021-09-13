import * as React from "react";
import { useState } from "react";

const Square = ({ letter, isCenterLetter }) => {
  const [l] = useState(letter);
  const [center] = useState(isCenterLetter);

  if (center) {
    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-body" style={{ textAlign: "center" }}>
          <b style={{ fontSize: "large" }}>{l.toUpperCase()}</b>
        </div>
      </div>
    );
  }

  return (
    <div className="card text-dark bg-light mb-3">
      <div className="card-body" style={{ textAlign: "center" }}>
        <b style={{ fontSize: "large" }}>{l.toUpperCase()}</b>
      </div>
    </div>
  );
};

export default Square;
