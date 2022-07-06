import React from "react";
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [numRolls, setNumRolls] = React.useState(0);
  const [rollRecord, setRollRecord] = React.useState(JSON.parse(localStorage.getItem("rollRecord")) || 0)

  React.useEffect(() => {

    const allHeld = dice.every((die) => {
      return die.isHeld;
    });

    const areEqual = () => {
      for(let i = 0; i < dice.length - 1; i++){
        if(dice[i].value !== dice[i+1].value){
          return false;
        } else{
          return true;
        }
      }
    }
    
    if(allHeld && areEqual()){
      setTenzies(true)
      console.log("game won")
      setRollRecord(() => {
        const rRecord =JSON.parse(localStorage.getItem("rollRecord"));
        if(rRecord){
          return numRolls < rollRecord? numRolls : rollRecord;
        } else{
          return numRolls;
        }
        
      })
    }

  }, [dice])

  React.useEffect(() => {
   
      
        localStorage.setItem("rollRecord", JSON.stringify(rollRecord))
      
  }, [rollRecord])

  function allNewDice(){
    const result = [];

    for(let i = 0; i < 10; i++){
      result.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false })
    }
    return result;
  }
  
  function holdDice(id){
    setDice(prev => {
      return(
        prev.map(die => {
          return die.id === id ? {...die, isHeld: !die.isHeld} : die;
        })
      )
    })
  }

  

  
  const diceElements = dice.map(num =>{
    return(
      <Die key={num.id}
       value={num.value}
       isHeld={num.isHeld}
       holdDice={() => holdDice(num.id)}
      />
    )
  })
  
  function rollDice(){
    setDice(prev => {
     return (
      prev.map( die => 
        die.isHeld? die : {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false }
      )
     )
    });
    setNumRolls(prev => prev + 1)
  }

  function restGame(){
    setDice(allNewDice())
    setTenzies(false)
    setNumRolls(0);
  }

  return (
    <div className="App">
      {tenzies && <Confetti />} 
      <main className="main-container">
       <span className="roll-record">Roll Record: <span>{rollRecord}</span></span> 
      <span className="num-rolls">Number Of Rolls: <span>{numRolls}</span></span>
      <h1 className="title">Tenzies</h1>
            {tenzies? <h3 className="congrats">Congratulations, You Won The Game!</h3>: <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p> }
          <div className="dies-container">
            {diceElements}
          </div>
          
          <button className="roll-dice"
          onClick={tenzies? restGame : rollDice}>{tenzies? "New Game" : "Roll"} </button>
  
      </main>
    </div>
  );
}

export default App;
