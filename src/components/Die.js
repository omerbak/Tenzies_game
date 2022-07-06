import React from 'react'

const Die = (props) => {
  function renderSwitch(val) {
    switch(val) {
      case 1:
        return <i class="fa-solid fa-dice-one"></i>;
      case 2:
        return <i class="fa-solid fa-dice-two"></i>;
      case 3:
        return <i class="fa-solid fa-dice-three"></i>;
      case 4:
        return <i class="fa-solid fa-dice-four"></i>;
      case 5:
        return <i class="fa-solid fa-dice-five"></i>;
      case 6:
        return <i class="fa-solid fa-dice-six"></i>;
      default:
        return 'error';
    }
  }
  return (
    <div className={`die ${props.isHeld? "held" : ""}`} 
    onClick={props.holdDice}    
    data-num={`${props.value}`}>
        {/* <h2>{props.value}</h2> */}
        {renderSwitch(props.value)}
    </div>
  )
}

export default Die