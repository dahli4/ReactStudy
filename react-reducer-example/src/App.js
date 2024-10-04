import './App.css';
import React, { useReducer, useState } from 'react';
function App() {
  // const [count, setCount] = useState(0);
  const [amount, amountDispatch] = useReducer(countAmount, 0);
  const [plusNumber, setPlusNumber] = useState(5);
  const [subNumber, setSubNumber] = useState(5);

  function countAmount(oldAmount, action) {
    if (action.type === "DOWN") {
      return (oldAmount - action.minus);
    }
    else if (action.type === "RESET") {
      return 0;
    }
    else if (action.type === "UP") {
      return (oldAmount + action.plus);
    }
  }

  function down() {
    amountDispatch({ type: 'DOWN', plus: plusNumber, minus: subNumber });
  }

  function reset() {
    amountDispatch({ type: 'RESET', number: plusNumber, minus: subNumber });
  }

  function up() {
    amountDispatch({ type: 'UP', plus: plusNumber, minus: subNumber });
  }

  function changePlusNumber(event) {
    setPlusNumber(Number(event.target.value));
  }

  function changeSubNumber(event) {
    setSubNumber(Number(event.target.value));
  }

  return (
    <div align='center'>
      <input type='text' value={subNumber} size='3' onChange={changeSubNumber} />
      <input type='button' value='-' onClick={down} />
      <input type='button' value='0' onClick={reset} />
      <input type='button' value='+' onClick={up} />
      <input type='text' value={plusNumber} size='3' onChange={changePlusNumber} />
      <p><span>{amount}</span></p>
    </div>
  );
}

export default App;
