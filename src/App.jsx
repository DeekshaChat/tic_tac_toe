import React from "react";
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Logs from "./components/Logs";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}
const WINNING_COMBINATIONS = [
  [{ row: 0, col: 0}, {row: 0, col:1}, {row: 0, col: 2}],
  [{ row: 1, col: 0}, {row: 1, col:1}, {row: 1, col: 2}],  
  [{ row: 2, col: 0}, {row: 2, col:1}, {row: 2, col: 2}],
  [{ row: 0, col: 0 }, {row: 1, col:1}, {row: 2, col: 2}],
  [{ row: 0, col: 2 }, {row: 1, col:1}, {row: 2, col: 0}],
  [{ row: 0, col: 0 }, {row: 1, col:0}, {row: 2, col: 0}],
  [{ row: 0, col: 1 }, {row: 1, col:1}, {row: 2, col: 1}],
  [{ row: 0, col: 2 }, {row: 1, col:2}, {row: 2, col: 2}],
   
 ];

const INITIAL_GAME_BOARD = [[null, null, null],[null, null, null], [null, null, null]];

function derivedWinner(gameBoard, players){
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].col];
    const secondSquare = gameBoard[combination[1].row][combination[1].col];
    const thirdSquare = gameBoard[combination[2].row][combination[2].col];
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
     winner = players[firstSquare];
    } 
   }
   return winner;
}

function getGameBoard(gameTurns) {
  let gameBoard = JSON.parse(JSON.stringify(INITIAL_GAME_BOARD)); 
  // let gameBoard = [...INITIAL_GAME_BOARD.map(innerArr => [...innerArr])];
  for (const gameTurn of gameTurns) {
    const {square, player} = gameTurn;
    const {row, col} = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [playerSymbol, setPlayerSymbol] = React.useState("X");
  const [gameTurns, setGameTurns] = React.useState([]);
  const [players, setPlayers] = React.useState(PLAYERS);

  const gameBoard = getGameBoard(gameTurns);
  const winner = derivedWinner(gameBoard, players);
  let hasDraw = gameTurns && gameTurns.length === 9 && !winner;


  function handleRematch(){
    setGameTurns([]);
  }

  function handleBoardButtonclick(rowIndex, colIndex) {
    setPlayerSymbol((currPlayerSymbol) => currPlayerSymbol === "X" ? "O" : "X");
    setGameTurns((prevGameTurns) => {
      let currentPlayer = 'X';
      if (prevGameTurns.length > 0 && prevGameTurns[0].player === 'X') {
        currentPlayer = 'O';
      }
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevGameTurns];
      return updatedTurns;
    }
  );
  };

  function handlePlayerNameChange(symbol, newName) {    
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            name={PLAYERS.X}
            symbol={"X"}
            isActive={playerSymbol === "X"}
            handlePlayerNameChange={handlePlayerNameChange}/>
          <Player
            name={PLAYERS.O}
            symbol={"O"}
            isActive={playerSymbol === "O"}
            handlePlayerNameChange={handlePlayerNameChange}/>
        </ol>
        <GameBoard
          playerSymbol={playerSymbol}
          onSelectSquare={handleBoardButtonclick}
          gameBoard={gameBoard}
          />
        {(winner || hasDraw) && <GameOver winner={winner} handleRematch={handleRematch}/>}
        <Logs gameTurns={gameTurns}/>
      </div>
    </main>
  )
}

export default App
