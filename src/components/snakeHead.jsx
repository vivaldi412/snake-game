import React from "react";
export default function snakeHead() {
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
}