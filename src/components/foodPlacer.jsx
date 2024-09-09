import React from "react";
export default function foodPlacer() {
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
}