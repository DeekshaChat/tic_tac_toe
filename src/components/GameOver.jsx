export default function GameOver({winner, handleRematch}) {
  return (
    <div id="game-over">
      <h1>Game Over</h1>
        {winner ? <p>{winner} won!</p> : <p>It's a draw!</p>}
        <button onClick={handleRematch}>Rematch</button>
    </div>
    )
}