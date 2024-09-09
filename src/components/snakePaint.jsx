import React from "react";
export default function snakePaint() {
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







}