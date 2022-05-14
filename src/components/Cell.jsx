import React from "react";
import { faBiohazard, faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cell = ({ col, i, j,onLclick, onRclick }) => {
    const getValue=(celldata)=>{
        const {isMine, isRevealed ,neighbors} =celldata;
        //if(isMine && isRevealed) return <FontAwesomeIcon icon={faBiohazard} style={{color:"#ff0000", }}/>
        if(isMine) return <FontAwesomeIcon icon={faBiohazard} style={{color:"#4b4b4b", }}/>;
        if(isRevealed){
          if(neighbors){
            return neighbors;
          }else{
            return ""
          }
        }
        // if(neighbors) return neighbors;
        return <FontAwesomeIcon icon={faSquareFull} className="icon"/>;
    }
  return (
    <div onClick={(e)=>onLclick(e,i,j)} onContextMenu={(e)=>onRclick(e,i,j)} className="cell" key={`${i}-${j}`} data-dimension={`${i}-${j}`}>
      {getValue(col)}
    </div> //showing the cell value
  );
};

export default Cell;
