import React from "react";
import { Icon } from '@iconify/react';
import {  faSquareFull, faFlag} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cell = ({ col, i, j,onLclick, onRclick }) => {
    const getValue=(celldata)=>{
        const {checkFlag,isClickedMine,isMine, isRevealed ,neighbors, isFlagged} =celldata;
        if(checkFlag) return <Icon icon="fa-solid:question" />;
        if(isFlagged) return <Icon icon="gis:flag-b" color="#b00000"/>
        if(isMine && isClickedMine) return <Icon icon="mdi:mine" color="#b00000" />;
        if(isRevealed){
          if(isMine){
            return <Icon icon="mdi:mine" color="#4b4b4b" />;
          }
          if(neighbors){
            if(neighbors==1){
              return <div className="number1">{neighbors}</div>;
            }else if(neighbors==2){
              return <div className="number2">{neighbors}</div>;
            }else if(neighbors==3){
              return <div className="number3">{neighbors}</div>;
            }else{
              return <div className="number">{neighbors}</div>;
            }
          }else{
            return "";
          }
        }
        //if(neighbors) return neighbors;
        return <FontAwesomeIcon icon={faSquareFull} className="icon"/>;
    }
  return (
    <div onClick={(e)=>onLclick(e,i,j)} onContextMenu={(e)=>onRclick(e,i,j)} className="cell" key={`${i}-${j}`} data-dimension={`${i}-${j}`}>
      {getValue(col)}
    </div> //showing the cell value
  );
};

export default Cell;
