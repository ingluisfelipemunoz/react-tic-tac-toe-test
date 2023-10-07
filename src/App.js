import { useState } from "react";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState("");
  function onSquareClick(square) {
    if (squares[square]) return;
    if (winner) {
      alert("We already have a winner: " + winner);
      return;
    }
    function handleWinner(x) {
      console.log("handling winner", x);
      setWinner(x);
    }
    console.log("function called");
    const tempSquares = squares.slice();
    tempSquares[square] = xIsNext ? "X" : "O";
    setSquares(tempSquares);
    setXIsNext(!xIsNext);
    const _winner = calculateWinner(tempSquares, (x) => handleWinner(x));
    console.log("winner", _winner);
    /*if (_winner) {
      setWinner(_winner);
      console.log("A new winner" + winner);
    }*/
  }
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
      {winner && (
        <>
          <br />
          <h1>We have new winner: {winner}</h1>
        </>
      )}
    </>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares, setWinner) {
  console.log("calculating winner", squares, "length", squares.length);
  const posibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [2, 4, 6],
    [0, 4, 8]
  ];
  for (let i = 0; i < posibilities.length; i++) {
    console.log("ii", i);
    const [a, b, c] = posibilities[i];
    console.log("i" + i, "square", posibilities[i], "a", a, "b", b, "c", c);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      console.log("winner----");
      setWinner(squares[a]);
      return squares[a];
    }
  }
  return null;
}
