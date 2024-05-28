import { useState } from 'react';
import confetti from 'canvas-confetti';
import './index.css'

const TURNS = {
  '❌': '❌',
  '⭕': '⭕'
};

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

const Square = ({children, isSelected, updateBoard, index}) => {
  
  const ClassName = `square ${isSelected == true ? 'is-selected' : ''}`
  
  const handleClick = () => {
    updateBoard(index);
  }

  return(
    <div onClick={handleClick} className={ClassName}>
      {children}
    </div>
  );
}

export default function App() {
  
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(TURNS['❌']);
  const [board, setBoard] = useState(Array(9).fill(null));

  const restartGame = () => {
    
    setWinner(null);
    setTurn(TURNS['❌']);
    setBoard(Array(9).fill(null));
  }
  
  const checkWinner = (boardToCheck) => {
    
    for(const combo of WINNER_COMBOS){
      
      const [a,b,c] = combo;

      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a];
      }
    }

    return null;
  }

  const checkEndGame = (gameToCheck) => {
    
    return gameToCheck.every(position => position !== null);
  }
  
  const updateBoard = (index) => {
    if(board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    
    if(newWinner){

      confetti();
      setWinner(newWinner);
    }
    else if(checkEndGame(newBoard)){
      
      setWinner(false);
    }
    else{
      
      const newTurn = turn === TURNS['❌'] ? TURNS['⭕'] : TURNS['❌'];
      setTurn(newTurn);
    }
  }

  return (
    <main className="board">
      
      <h1>Tic Tac Toe</h1>
      
      <section className="game">
        {
          board.map((square,index) => {
            return(
              <Square key={index} updateBoard={updateBoard} index={index}>
                {square}
              </Square>
            );
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS['❌']}>
          {TURNS['❌'].valueOf()}
        </Square>
        
        <Square isSelected={turn === TURNS['⭕']}>
          {TURNS['⭕']}
        </Square>
      </section>

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false ? 'Empate' : 'Ganó:'
                }
              </h2>

              {
                winner !== false &&
                <header className='win'>
                  {winner && <square>{winner}</square>}
                </header>
              }

              <footer>
                <button onClick={restartGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )  
      }

    </main>
  )
}


