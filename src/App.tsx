import React from 'react';
import './App.scss';
import { AverageWeather } from './components/AverageWeather/AverageWeather';

function App() {
  return (
    <div className="App">
      <h1>Hong Kong Weather</h1>
      <AverageWeather />
    </div>
  );
}

export default App;
