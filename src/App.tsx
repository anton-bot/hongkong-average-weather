import React from 'react';
import './App.scss';
import { WeatherJson } from './components/WeatherJson';

function App() {
  return (
    <div className="App">
      <h1>Hong Kong Weather</h1>
      <WeatherJson />
    </div>
  );
}

export default App;
