import React, { useState } from "react";
import { Container } from "@mui/material";
import { genRandomMines, genNeighbors } from "../utils";
import Cell from "../components/Cell";
import produce from "immer";
import { Icon } from '@iconify/react';
import Popup from "../components/Popup";
import Confetti from "../components/Confetti";
import Conf from "../components/Conf";
import "./boardstyle.scss";
const Board = () => {
  
  const setupData = {
    width: 5,
    height: 5,
    mines: 5,
  };

  const dialogs=["Too Soon uh??","Focus Focus Focus!!","You've come this far","Little bit Concentration!!","You're Kidding right?","Seriously?",
  "You got this","Ahh!!..Come on!"]

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
            isFlagged : false,
            isClickedMine:false,
            checkFlag:false,
          }))
      );
    let mutatedArrayWithMines = genRandomMines(array2D, h, w, m); //generate random mines
    let mutatedArrayWithNeighbors = genNeighbors(mutatedArrayWithMines, h, w);
    for(let i = 0;i<setupData.height;i++){
      let str = "";
      for(let j = 0;j<setupData.width;j++){
        if(mutatedArrayWithNeighbors[i][j].isMine){
          str+="M "
        }else{
          str+="E ";
        }
      }
      console.log(str);
    }
    console.log("");
    return mutatedArrayWithNeighbors;
  };

  const gameOver=(x,y)=>{
    let mineGrid = grid;
    mineGrid = produce(mineGrid, (draft) => {
      Object.assign(draft[x][y], { isClickedMine: true });
    });
    for(let i = 0;i<setupData.height;i++){
      for(let j = 0;j<setupData.width;j++){
        if(mineGrid[i][j].isMine){
          mineGrid = produce(mineGrid, (draft) => {
            Object.assign(draft[i][j], { isRevealed: true });
          });
          console.log(grid[i][j].isRevealed)
        }
      }
    }
    setquitter("So long Partner :(")
    setquit(false);
    setlost(true);
    setgrid(mineGrid)
  }

  const revealCells=(x,y)=>{
    const dirs=[
      [ -1, 0 ],
      [ -1, 1 ],
      [ 0, 1 ],
      [ 1, 1 ],
      [ 1, 0 ],
      [ 1, -1 ],
      [ 0, -1 ],
      [ -1, -1 ]
    ];
    let revealGrid = grid;
    let m = setupData.height, n = setupData.width;
    var q = [];
    q.push([x,y]);
    //console.log(q.length);
    while(q.length>0){
      console.log("hello");
      let pair = q.shift();
      let i = pair[0], j = pair[1];
      if(revealGrid[i][j].isRevealed) continue;
      let mines = 0;
      dirs.forEach(([x,y])=>{
        const new_x = i+x;
        const new_y = j+y;
        if (!((0 <= new_x && new_x < m) && (0 <= new_y && new_y < n))) {
            return;
        }
        if (revealGrid[new_x][new_y].isMine)
            mines++;
      });
      if(mines===0){
        revealGrid = produce(revealGrid, (draft) => {
          Object.assign(draft[i][j], { isRevealed: true });
        });
        dirs.forEach(([x,y])=>{
          const new_x = i+x;
          const new_y = j+y;
          if (!((0 <= new_x && new_x < m) && (0 <= new_y && new_y < n))) {
              return;
          }
          q.push([new_x,new_y]);
        });
      }else{
        revealGrid = produce(revealGrid, (draft) => {
          Object.assign(draft[i][j], { isRevealed: true });
        });
      }
    }
    setgrid(revealGrid);
    
  }

  const [haswon, sethaswon] = useState("");
  const [flaggedMines, setflaggedMines] = useState(setupData.mines);
  const [gameState, setgameState] = useState(
    <Icon icon="entypo:emoji-happy" />
  );
  const [grid, setgrid] = useState(() => initBoard(setupData));
  const [quitter, setquitter] = useState("");
  const [quit, setquit] = useState(true);
  const [won, setwon] = useState(false);
  const [lost, setlost] = useState(false);
  const [popOpen, setpopOpen] = useState(false);
  const [conf, setconf] = useState(false)

  const togglePopup=(event)=>{
    event.preventDefault();
    setpopOpen(!popOpen);
  }

  const hasWon=()=>{
    let mines = 1, revealed = 1;
    for(let i = 0;i<setupData.height;i++){
      for(let j = 0;j<setupData.width;j++){
        //console.log("sdshdsd");
        if(grid[i][j].isMine && grid[i][j].isFlagged){
          mines++;
        }
        if(grid[i][j].isRevealed){
          revealed++;
        }
      }
    }
    //console.log("mines: "+mines);
    //console.log("revealed: "+revealed);
    let totalCells = setupData.height*setupData.width;
    return revealed===totalCells-setupData.mines;
  }

  const onLeftClick = (event,x, y) => {
    if(won || lost){
      return;
    }
    event.preventDefault();
    let updatedGrid = grid;
    if(grid[x][y].isFlagged) return;
    if (grid[x][y].isRevealed){
      console.log(grid[x][y]);
      return;
    }
    if(!grid[x][y].isRevealed){
      updatedGrid = produce(grid, (draft) => {
        Object.assign(draft[x][y], { isRevealed: true });
      });
    }
    if (updatedGrid[x][y].isMine) {
      gameOver(x,y);
      return setgameState(<Icon icon="entypo:emoji-sad" color="#830000"/>);
    }
    if(updatedGrid[x][y].isEmpty){
      revealCells(x,y);
      if(hasWon()){
        sethaswon("You Won!!!")
        setwon(true);
        setquit(false);
        console.log("DONE");
      }
      return;
    }
    setgrid(updatedGrid);
    console.log(grid[x][y]);
    if(hasWon()){
      sethaswon("You Won!!!")
      setwon(true);
      setquit(false);
      setconf(true);
      setgameState(<Icon icon="bi:emoji-sunglasses" color="#016301"/>);
      console.log("DONE");
    }
  };

  const onRightClick = (event, x, y) => {
    if(won || lost){
      return;
    }
    event.preventDefault();
    //console.log("right click");
    let updatedGrid = grid;
    if(grid[x][y].isFlagged){
      //console.log("herfgfge");
      updatedGrid = produce(grid, (draft) => {
        Object.assign(draft[x][y], { checkFlag:true, isFlagged:false});
      });
      setflaggedMines(flaggedMines + 1);
    }else if(grid[x][y].checkFlag){
      updatedGrid = produce(grid, (draft) => {
        Object.assign(draft[x][y], { checkFlag:false});
      });
    }else if(!grid[x][y].isFlagged && !grid[x][y].isRevealed){
      updatedGrid = produce(grid, (draft) => {
        Object.assign(draft[x][y], { isFlagged: true });
      });
      setflaggedMines(flaggedMines - 1);
    }
    if (flaggedMines === 0) {
      setflaggedMines(0);
    }
    console.log(flaggedMines);
    setgrid(updatedGrid);
    console.log(grid[x][y]);
  };

  const resetGame = (e, setupData) => {
    e.preventDefault();
    let index = Math.floor(Math.random()*8);
    if(quit){
      setquitter(dialogs[index]);
    }else {
      setconf(false);
      setgameState(<Icon icon="entypo:emoji-happy" />);
      setgrid(initBoard(setupData));
      setquit(true);
      setwon(false);
      setlost(false);
      setflaggedMines(setupData.mines);
      setquitter("");
      sethaswon("");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      {conf && <Conf/>}
      <h3 className="logo">MINESWEEPER</h3>
      <div className="help" onClick={(e)=>togglePopup(e)}><Icon icon="carbon:help" height="30" width="30"/></div>
      <div className="center">
        <h4 className="mines">Mines: {flaggedMines}</h4>
        <h1 onClick={(e) => resetGame(e, setupData)} className="state">{gameState}</h1>
        <h5 className="quitter">{quitter}</h5>
        {popOpen && <Popup toggle={(e)=>togglePopup(e)}/>}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${setupData.width},27px)`,
            gridTemplateRows: `repeat(${setupData.height},27px)`,
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
        <h4>{haswon}</h4>
      </div>
    </Container>
  );
};
export default Board;
