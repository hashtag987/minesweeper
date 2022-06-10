import React from 'react'
import Confetti from 'react-confetti';
const Conf=()=>{
  return (
      <div className='won'>
        <Confetti 
        numberOfPieces={200}
        gravity={0.1}/>
      </div>
    
  )
}

export default Conf