import React, { useState } from 'react'

function Player({initialName,symbol,isActive, onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing,setEditing ] = useState(false)
  console.log(isEditing)
  function handleClick() {
      setEditing((editing) => (!editing));

      if (isEditing) {
        onChangeName(symbol,playerName)
      }
  }
  function handleChange(e){
      setPlayerName(e.target.value);
  }
  return (
        <li className={ isActive ? 'active' : undefined}>
          <span className="player">
            {isEditing? (
              <input type="text" 
              required 
              value={playerName}
              onChange={handleChange}
              /> 
            ):(<span className="player-name">{playerName}</span>)}
            <span className="player-symbol">{symbol}</span>
            
          </span>
          <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
        </li>
  )
}

export default Player
//if the editing is true you should show teh inout fiels if not you shoulld show player-name