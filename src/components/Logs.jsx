export default function Logs({gameTurns}) {
  return (
    <ol id="logs">
     {gameTurns?.length > 0 && gameTurns.map((gameTurn, index) => (
       <li key={index}>{gameTurn.player} played at {gameTurn.square.row}, {gameTurn.square.col}</li>
     ))}
    </ol>
  )
}