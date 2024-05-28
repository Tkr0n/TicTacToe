import { useState } from 'react';
import { TURNS } from './constants.js';
import { Square } from './components/square.jsx';
import { checkWinner, checkEndGame } from './logic/board.js';
import { saveGameToStorage, restartGameStorage } from './logic/storage/index.js';
import confetti from 'canvas-confetti';
import './index.css';

export default function App() {

  const [board, setBoard] = useState(() => {
    
    const boardFromStorage = window.localStorage.getItem('board');
    
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    
    const turnFromStorage = window.localStorage.getItem('turn');
    
    return turnFromStorage ?? TURNS['❌'];
  });

  // null es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const restartGame = () => {
    
    setWinner(null);
    setTurn(TURNS['❌']);
    setBoard(Array(9).fill(null));

    restartGameStorage();
  };
  
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
      saveGameToStorage({
        board: newBoard,
        turn: newTurn
      });
    }
  };

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
  );
}


