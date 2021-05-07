import logo from './logo.svg';
import './App.css';

function Header(){
  return (
    <header>
        <h1><u>Http:// Link Note Home</u></h1>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
    </div>
  );
}



export default App;
