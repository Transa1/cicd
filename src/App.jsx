import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Jenkins muejejeje</h1>
      <h2>Tengo Hambre</h2>
      <h3>Al yorch le huelen las patas</h3>
      <h1>eaaaaa</h1>
      <h2>este pa ver si se pone solo en rama</h2>
      <h2>Hace tiempo un cabron daño su corazon uuuh lala</h2>
      <h2>Alvarito</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more, El Yorch está en su era
        pilates
      </p>
    </>
  );
}

export default App;
