import React, { useState } from "react";
import { Container } from "@mui/material";
import { genRandomMines, genNeighbors } from "../utils";
import Cell from "../components/Cell";
import produce from "immer";
import { faFaceGrin, faFaceDizzy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Board = () => {
  const setupData = {
    width: 20,
    height: 20,
    mines: 30,
  };

  const initBoard = () => {
    const { width: w, height: h, mines: m } = setupData;
    let array2D = Array(w)
      .fill()
      .map((_, indexH) =>
        Array(h)
          .fill()
          .map((_, indexW) => ({
            x: indexH, //state of the cell
            y: indexW,
            isMine: false, // has mine?
            neighbors: 0, // neighbouring number
            isEmpty: false,
            isRevealed: false,
          }))
      );
    let mutatedArrayWithMines = genRandomMines(array2D, h, w, m); //generate random mines
    let mutatedArrayWithNeighbors = genNeighbors(mutatedArrayWithMines, h, w);
    return mutatedArrayWithNeighbors;
  };
  const [gameState, setgameState] = useState(
    <FontAwesomeIcon icon={faFaceGrin} size="1x" />
  );
  const [grid, setgrid] = useState(() => initBoard(setupData));
  const onLeftClick = (event, x, y) => {
    if (event.type === "click") {
      event.preventDefault();
      console.log(grid[x][y]);
      if (grid[x][y].isRevealed) return;
      const updatedGrid = produce(grid, (draft) => {
        Object.assign(draft[x][y], { isRevealed: true });
      });
      if (updatedGrid[x][y].isMine) {
        return setgameState(<FontAwesomeIcon icon={faFaceDizzy} size="1x" />);
      }
      setgrid(updatedGrid);
    } else {
      console.log("right click");
    }
  };

  const [isWon, setisWon] = useState("");
  const [flaggedMines, setflaggedMines] = useState(setupData.mines);

  const onRightClick = (event, x, y) => {
    event.preventDefault();
    console.log("right click");
    setflaggedMines(flaggedMines - 1);
    if (flaggedMines === 0) {
      setisWon("You Won!!!");
      setflaggedMines(0);
    }
    console.log(flaggedMines);
  };

  const resetGame = (e, setupData) => {
    e.preventDefault();
    setgameState(<FontAwesomeIcon icon={faFaceGrin} size="1x" />);
    setgrid(initBoard(setupData));
    setflaggedMines(setupData.mines);
    setisWon("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <h2>{isWon}</h2>
      <div className="center">
        <h4>Mine count: {flaggedMines}</h4>
        <h1 onClick={(e) => resetGame(e, setupData)}>{gameState}</h1>
        {/* <button onClick ={(e)=>resetGame(e,setupData)} className="button"><FontAwesomeIcon icon={faArrowRotateRight} size="2x"/></button> */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${setupData.width},25px)`,
            gridTemplateRows: `repeat(${setupData.height},25px)`,
          }}
        >
          {grid.map((row, i) =>
            row.map((col, j) => (
              <Cell
                onLclick={(event, i, j) => onLeftClick(event, i, j)}
                onRclick={(event, i, j) => onRightClick(event, i, j)}
                key={`${i}-${j}`}
                col={col}
                i={i}
                j={j}
              ></Cell>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};
export default Board;
