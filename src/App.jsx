import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X:'Player 1',
  O:"Player 2"
};

const intialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null],
];

function deriveActivePlayer(gameTurns){
  let currentPLayer = 'X';
    if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
      currentPLayer='O';
    }
    return currentPLayer
}

 function deriveGameBoard(gameTurns){
  let gameBoard = [...intialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
      const {square,player } = turn;
      const { row,  col } = square;

      gameBoard[row][col] = player;
  }
  return gameBoard
 }

function deriveWinner(gameBoard,player){
  let winner ;
  for (const combination of WINNING_COMBINATIONS) { 
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = player[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [player,setPlayers]= useState(PLAYERS)
  const [gameTurns,setGameTurns] = useState([])
  
  const gameBoard = deriveGameBoard(gameTurns)
  // const [activePlayer,setActivePLayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurns);

  const winner = deriveWinner(gameBoard,player)
  
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectionSquare(rowIndex,colIndex){
    // setActivePLayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X')
    
    setGameTurns((prevTurns) => {
      const currentPLayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col : colIndex}, player : currentPLayer },...prevTurns];
      console.log(updatedTurns)
      return updatedTurns;
    })
  }  function handleRestart() {
    setGameTurns([]);
  } function handlePlayerNameChange(symbol,newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }
  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X}symbol={"X"} isActive={activePlayer === 'X'}
        onChangeName = {handlePlayerNameChange}
        />
        <Player initialName={PLAYERS.O} symbol={"O"} isActive={activePlayer === 'O'}
        onChangeName = {handlePlayerNameChange}
        />
      </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectionSquare} 
      board = {gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
  </main>
}

export default App