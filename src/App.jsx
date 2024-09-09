import React from "react";
import { nanoid } from "nanoid";


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
  const [refresh, setRefresh] = React.useState(0)
  const requestRef = React.useRef(null)
  const framerateRef = React.useRef(null)
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
    let ugo = boardRef.current[nowIndex].snake.indexNextU()   //lgo === 0 ||
    if (ugo < 0) {
      ugo = ugo + 400
    }
    let bgo = boardRef.current[nowIndex].snake.indexNextB()
    if (bgo > 400 || bgo === 400) {
      bgo = bgo - 400
    }


    // console.log('first', nowIndex, 'snakelength', snakeCountRef.current)
    if (aim === "right") { Aim = rgo }
    else if (aim === "left") { Aim = lgo }
    else if (aim === "up") { Aim = ugo }
    else if (aim === "down") { Aim = bgo }
    else { Aim = rgo }



    // console.log(Aim)`
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
    let now;
    boardRef.current = boardRef.current.map(board => {
      if (board.snake?.index !== null) {
        now = board.index
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
    return now;
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
  function start() { requestRef.current = window.requestAnimationFrame(snakeMove) }
  function stop() { window.cancelAnimationFrame(requestRef.current) }


  //9999999999999999999999999999999999999999999999999999999999999999first index






























  function setHandle() { //push
    let temp;
    snakeHead2(0)
    if (!foodRef.current) { placeFood() }
    requestRef.current = window.requestAnimationFrame(snakeMove)
    console.log('done')
  }

  function testLength() {
    snakeMoveSpeed()
    setBoard(boardRef.current)


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
      <button onClick={setHandle}>push</button>

      <button onClick={start}>Start</button>

      <button onClick={stop}>Stop</button>
      <button>{howmanyRef.current + 1}</button>

      <div className="game-box">
        {board.map(board => board.value)}

      </div>
    </main>
  )
}

