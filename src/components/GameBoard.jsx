import React from "react";
import '../index.css';

export default function GameBoard({gameBoard, onSelectSquare}) {


  // const [gameBoard, setBoardGame] = React.useState(initialGameBoard);

  // const handleButtonClick = (rowIndex, colIndex) => {
  //   setBoardGame((prevBoard) => {
  //     const newBoard = [...prevBoard.map(innerArr => [...innerArr])];
  //     newBoard[rowIndex][colIndex] = playerSymbol;
  //     return newBoard;
  //   });
  //   onSelectSquare();
  // };

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((player, cellIndex) => (
              <li key={cellIndex}>
                <button 
                onClick={() => onSelectSquare(rowIndex, cellIndex)}
                disabled={player !== null}>
                  {player}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}