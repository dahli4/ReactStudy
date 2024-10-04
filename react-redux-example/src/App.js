import { useState } from 'react';
import './App.css';
import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from 'react-redux';

function reducer(currentState, action) {
  if (currentState === undefined) {
    return { number: 1, };
  }
  const newState = { ...currentState };
  if (action.type === 'PLUS') {
    newState.number++;
  } else if (action.type === 'MINUS') {
    newState.number--;
  }
  return newState;
}

const myStore = createStore(reducer);

function App() {
  const [number, setNumber] = useState(1);

  return (
    <div id='container'>
      <h1>Root</h1>
      <div id='grid'>
        <Provider store={myStore}>
          <Left1></Left1>
          <Right1></Right1>
        </Provider>
      </div>
    </div >
  );
}

function Left1(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left2></Left2>
    </div>
  );
}

function Left2(props) {
  return (
    <div>
      <h1>Left2</h1>
      <Left3></Left3>
    </div>
  );
}

function Left3(props) {
  const curNumber = useSelector((state) => { return state.number; });
  return (
    <div>
      <h1>Left3 : {curNumber}</h1>
    </div>
  );
}

function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2></Right2>
    </div>
  );
}

function Right2(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Right2</h1>
      <input type='button' value='-' onClick={() => {
        dispatch({ type: 'MINUS' });
      }} />
      <Right3></Right3>
    </div>
  );
}

function Right3(props) {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Right3</h1>
      <input type='button' value='+' onClick={() => {
        dispatch({ type: 'PLUS' });
      }} />
    </div>
  );
}

export default App;
