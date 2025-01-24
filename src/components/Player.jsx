import { useState } from "react";
import './../index.css'

export default function Player({name, symbol, isActive, handlePlayerNameChange}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  console.log('isActive', isActive);
  
  function handleEdit() {
    setIsEditing(wasEditing => !wasEditing);
    if (isEditing) {
      handlePlayerNameChange(symbol, playerName);
    }
  }

  return (
    <li className={ isActive ? 'active': undefined}>
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