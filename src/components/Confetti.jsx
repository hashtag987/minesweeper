import React from 'react'
import ConfettiCanvas from 'react-confetti-canvas';
const Confetti=()=>{
  return (
      <div className='won'>
        <ConfettiCanvas
        colors={[
        ['#F1948A', '#C39BD3'],
        ['#7FB3D5', '#76D7C4'],
        ['#F0B27A', '#7DCEA0']
        ]} 
        />
      </div>
    
  )
}

export default Confetti