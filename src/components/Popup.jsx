import React from 'react'
import { Icon } from '@iconify/react';
import "../pages/boardstyle.scss";
const Popup=({toggle})=> {
  return (
    <div className="container">
      <div className="box">
        <span className='close-icon' onClick={(e)=>toggle(e)}><Icon icon="clarity:close-line" width="20" height="25" /></span>
        <h4 className='head'><u>Objective</u></h4>
        <div className="content">
          <p>The objective in Minesweeper is to find and mark all the mines hidden under the grey squares, in the shortest time possible. This is done by clicking on the squares to open them. Each square will have one of the following:</p>
          <ul>
            <li>A mine, and if you click on it you'll lose the game.</li>
            <li>A number, which tells you how many of its adjacent squares have mines in them.</li>
            <li>Nothing. In this case you know that none of the adjacent squares have mines, and they will be automatically opened as well.</li>
          </ul>        
        </div>
        <br/>
        <br/>
        <h4 className='head'><u>Game play</u></h4>
        <div className="content">
          <p>In Minesweeper, you may essentially do five different actions:</p>
          <ol>
            <li>Open a square. This is done simply by left clicking on a square.</li>
            <li>Marking a square as a mine. This is done by right clicking on a square. A little mine icon will show up there.</li>
            <li>Marking a square with a question mark. This is done by right clicking twice on a square, or right clicking once on a square that's already marked as a mine. Question marks are useful to mark squares you're not absolutely sure are mines, but want to make sure you don't accidentally open them.</li>
            <li>Clear any marks. Again, right click on the square. Right clicking cycles through the following states: Bomb, Question Mark, Clear.</li>
            <li>Opening all remaining adjacent squares to a number square. If for example you have a square with the number 1 and you have already marked one mine in one of the adjacent squares you can left click on the 1 square and the remaining adjacent squares will all be opened. This can save a lot of time while trying to quickly clear out squares.</li>
          </ol>        
        </div>
        <br/>
        <br/>
        <h4 className='head'><u>Winning</u></h4>
        <div className="content">
          <p>When you've opened all squares that don't contain a mine, you've won the game. If you open all the empty/nr squares but don't flag the remaining mine squares, they will be auto-flagged and you will win. So, flagging is really optional; it's simply there to assist you in keeping track of where you think the mines are. To truly win, you must first open all of the non-mine squares. If you're aiming to improve your time, you can utilise this to gain a small amount of speed.</p>
        </div>
      </div>
    </div>
  )
}

export default Popup