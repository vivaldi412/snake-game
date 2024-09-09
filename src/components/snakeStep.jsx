import React from "react";
export default function snakeStep() {
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
}