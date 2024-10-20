import { useState } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

import { Square } from './components/Square'
import { TURNS } from './components/constants'
import { checkWinnerfrom, checkEndGame } from './logic/board'
import { Mywinnermodal } from './components/Mywinnermodal'
import { Boardshow } from './components/Boardshow'
import { Selectturn } from './components/Selectturn'




function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
      return(Array(9).fill(null))
  })

  const [turn, setTurn]=useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner]=useState(null)

  
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    window.localStorage.renoveItem('board')
    window.localStorage.renoveItem('turn')


    //resetGameStorage()
  }
  const updateBoard = (index) => {

    if (board[index] || winner ) return
    const newBoard = [...board]
    newBoard[index] =turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    

    const newWinner =checkWinnerfrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
      console.log(`¡Tenemos un ganador! Ganó: ${newWinner}`)
    }else if (checkEndGame(newBoard)){
      setWinner(false)
      console.log('¡Es un empate')
    }
  }

  return (
  <>
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar Juego!</button>
      
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
            </Square>
            )
          })
        }
      </section>

      <section className='turn'>
          <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
          </Square>
      </section>

      <Mywinnermodal winner={winner} resetGame = {resetGame}/>
      

    </main>
  </>
  )
  
}

export default App
