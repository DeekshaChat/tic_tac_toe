import { useState } from "react"

export default function Player({name, symbol}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEdit() {
    setIsEditing(wasEditing => !wasEditing);
  }

  return (
      <li >
        <span className="player">
          {!isEditing ? <span className="player-name">{playerName}</span> : 
          <input
            placeholder="Player Name"
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}/>
          }
          <span className="player-symbol">{symbol}</span>
        </span>
        
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
  )
}