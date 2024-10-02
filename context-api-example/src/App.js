import './App.css';
import { createContext, useContext } from 'react';
const themeDefault = { border: '35px solid blue' };
const themeContext = createContext(themeDefault);

function App() {
  const theme = useContext(themeContext);
  return (
    <div className='root' style={theme}>
      <h1>Hello World!</h1>
      <Sub1 />
    </div>
  );
}

function Sub1() {
  const theme = useContext(themeContext);

  return (
    <themeContext.Provider value={{ border: '10px solid red' }}>
      <div style={theme}>
        <h2>Sub1</h2>
        <Sub2 />
      </div>
    </themeContext.Provider>
  );
}

function Sub2() {
  const theme = useContext(themeContext);

  return (
    <div style={theme}>
      <h3>Sub2</h3>
      <Sub3 />
    </div>
  );
}

function Sub3() {
  const theme = useContext(themeContext);

  return (
    <div style={theme}>
      <h4>Sub3</h4>
    </div>
  );
}

export default App;
