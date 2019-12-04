import React from 'react';
import './App.scss';
import { GetWeather } from './Components/GetWeather/GetWeather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GetWeather />
      </header>
    </div>
  );
}

export default App;
