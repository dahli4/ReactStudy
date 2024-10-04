import { Provider, useDispatch, useSelector } from 'react-redux';
import './App.css';
import myStore from './store';

function Counter(props) {
  const myCount = useSelector((state) => { return state.counter.value })
  const myDispatch = useDispatch();

  return (
    <div>
      <button onClick={() => {
        myDispatch({ type: 'countSlice/up', step: 2 })
        // myDispatch(mySlice.actions.up(2))
      }}> + </button> {myCount}
    </div >
  );
}

function App() {
  return (
    <Provider store={myStore}>
      <div align="center">
        <Counter></Counter>
      </div>
    </Provider>
  );
}

export default App;
