import React from "react";
import { nanoid } from "nanoid";
import foodPlacer from './components/foodPlacer.jsx'
import snakeHead from './components/snakeHead.jsx'
import snakePaint from './components/snakePaint.jsx'
import snakeStep from './components/snakeStep.jsx'


export default function App() {
  let tempBoardObNO2 = []
  let fuck = 1;
  let snakeSeter = {
    index: null,
    indexNextR: function () {
      return this.index + 1
    },
    indexNextL: function () {
      return this.index - 1
    },
    indexNextU: function () {
      return this.index - 20
    },
    indexNextB: function () {
      return this.index + 20
    }
  }
  for (let i = 0, k = 0; k < 20; k++) {
    for (let j = 0; j < 20; j++) {
      tempBoardObNO2.push({
        index: i,
        snake: snakeSeter,
        snakecount: null,
        food: null,
        value: <div className="board" key={nanoid()}></div>
      })
      i++
    }
  }
  const [board, setBoard] = React.useState(tempBoardObNO2)
  const [isPlayed, setIsPlayed] = React.useState(false)
  const requestRef = React.useRef(null)
  const keyRef = React.useRef(null)
  const keyChangeRef = React.useRef(null)
  const snakeCountRef = React.useRef(0)
  const howmanyRef = React.useRef(2)
  const boardRef = React.useRef(tempBoardObNO2)
  const foodRef = React.useRef(null)


  //##########################################################

  //=========================================================
  function snakeHead2(firstIndex) {
    boardRef.current = boardRef.current.map(board => {
      if (board.index === firstIndex) {
        return (
          board = {
            ...board,
            snakecount: ++snakeCountRef.current,
            snake: {
              ...board.snake,
              index: firstIndex
            }
          }
        )
      }
      else return board;
    })
    setBoard(boardRef.current)
  }
  // #########################################################

  //-------------------------------------------------------------------

  //################################################################
  function snakeStep2(aim) {
    let now;
    let Aim;
    let nowIndex;
    for (let i = 0; i < 400; i++) {
      if (boardRef.current[i].snakecount === snakeCountRef.current) {
        nowIndex = i;
        break;
      }
    }
    let rgo = boardRef.current[nowIndex].snake.indexNextR()
    if (rgo % 10 === 0 && rgo / 2 === 10 || rgo / 2 % 10 === 0) {
      rgo = rgo - 20
    }
    let lgo = boardRef.current[nowIndex].snake.indexNextL()
    if ((lgo + 1) === -1) {
      lgo = lgo + 19
    }
    if (((lgo + 1) / 2) % 10 === 0) {
      lgo = lgo + 20
    }
    let ugo = boardRef.current[nowIndex].snake.indexNextU()
    if (ugo < 0) {
      ugo = ugo + 400
    }
    let bgo = boardRef.current[nowIndex].snake.indexNextB()
    if (bgo > 400 || bgo === 400) {
      bgo = bgo - 400
    }



    if (aim === "right") { Aim = rgo }
    else if (aim === "left") { Aim = lgo }
    else if (aim === "up") { Aim = ugo }
    else if (aim === "down") { Aim = bgo }
    else { Aim = rgo }




    boardRef.current = boardRef.current.map(board => {
      if (board.index === Aim) {
        now = board.index
        return (
          board = {
            ...board,
            snakecount: ++snakeCountRef.current,
            snake: {
              ...board.snake,
              index: Aim
            }
          }
        )
      }
      else return board;
    })
    return now;
  }
  //################################################################
  function snakePaintRef() {
    boardRef.current = boardRef.current.map(board => {
      if (board.snake?.index !== null) {
        return (board = {
          ...board,
          value: <div className="board" id="snake" key={nanoid()}></div>
        })
      }
      else { return board }
    })
    boardRef.current = boardRef.current.map(board => {
      if (board.index === foodRef.current) {
        return (board = {
          ...board,
          food: foodRef.current,
          value: <div className="board" id="food" key={nanoid()}></div>,
        })
      }
      else { return board }
    })
    boardRef.current = boardRef.current.map(board => {
      if (board.snake?.index === null && board.food === null || board.food === null && board.snakecount < snakeCountRef.current - howmanyRef.current) {
        return (board = {
          ...board,
          snakecount: null,
          value: <div className="board" key={nanoid()}></div>,
          snake: {
            ...board.snake,
            index: null
          }
        })
      }
      else { return board }
    })
  }
  //################################################################
  function placeFood() {
    boardRef.current = boardRef.current.map(board => {
      return (
        board = {
          ...board,
          food: null
        }
      )
    })
    let randnum = Math.floor(Math.random() * 400)
    for (let i = 0; i < 400; i++) {
      if (boardRef.current[i].snake.index === randnum) {
        randnum = Math.floor(Math.random() * 400)
        break;
      }
    }
    foodRef.current = randnum
  }
  //################################################################
  // speedCounter === 6
  let speedCounter = 0;
  let speedStart = 0;
  let speedTimeStart = performance.now()
  //################################################################
  function snakeMove() {
    let tempNow;
    let timego;

    speedCounter++;
    timego = performance.now()

    if (timego - speedTimeStart > 50 || speedStart < 3) {
      tempNow = snakeStep2(keyChangeRef.current)
      snakePaintRef()

      if (tempNow === foodRef.current) {
        console.log("food = tempNow")
        placeFood()
        howmanyRef.current++
        snakePaintRef()
      }

      setBoard(boardRef.current)
      speedStart++
      speedCounter = 0;
      speedTimeStart = performance.now()
    }
    requestRef.current = window.requestAnimationFrame(snakeMove)
  }
  function reStart() {
    setIsPlayed(true)
    snakeHead2(0)
    if (!foodRef.current) { placeFood() }
    requestRef.current = window.requestAnimationFrame(snakeMove)
    console.log('done')
  }
  function stop() { window.cancelAnimationFrame(requestRef.current) }
  function toContinue() { window.cancelAnimationFrame(requestRef.current) }


  //9999999999999999999999999999999999999999999999999999999999999999first index

  function playHandle() {
    setIsPlayed(true)
    snakeHead2(0)
    if (!foodRef.current) { placeFood() }
    requestRef.current = window.requestAnimationFrame(snakeMove)
    console.log('start')
  }

  const startBox = (<div className="start-screen">
    <h2 onClick={playHandle}>Start</h2>
  </div>)

























  function setHandle() { //push
    snakeHead2(0)
    if (!foodRef.current) { placeFood() }
    requestRef.current = window.requestAnimationFrame(snakeMove)
    console.log('done')
  }

  function testLength() {



  }

  function testMoveByOne() {


  }


  function nullPaint() {

  }


  // ##################################################################
  React.useEffect(() => {
    keyRef.current = window.addEventListener("keydown", keyHandle)
    function keyHandle(event) {
      event.stopImmediatePropagation();
      if (event.key === "ArrowUp" || event.key === "w") {
        keyChangeRef.current = "up"
        console.log(keyChangeRef.current)
      }
      else if (event.key === "ArrowRight" || event.key === "d") {
        keyChangeRef.current = "right"
        console.log(keyChangeRef.current)
      }
      else if (event.key === "ArrowDown" || event.key === "s") {
        keyChangeRef.current = "down"
        console.log(keyChangeRef.current)
      }
      else if (event.key === "ArrowLeft" || event.key === "a") {
        keyChangeRef.current = "left"
        console.log(keyChangeRef.current)
      }
    }
    return () => {
      window.removeEventListener(keyRef.current, keyHandle)
      window.cancelAnimationFrame(requestRef.current)
    }
  }, [])


  return (
    <main>

      <button onClick={reStart}>restart</button>

      <button>{howmanyRef.current + 1}</button>
      <div className="score-box">
        <div className="score"><p>Score: {howmanyRef.current + 1}</p></div>
        <div className="high-score"><p>High Score: {howmanyRef.current + 1}</p></div>
      </div>
      <div className="game-box">
        {!isPlayed && startBox}
        {board.map(board => board.value)}

      </div>
      <button onClick={stop}>Stop</button>
      <button onClick={toContinue}>Continue</button>
    </main>
  )
}

