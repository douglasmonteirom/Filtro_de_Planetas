import React from 'react';
import Provider from './context/Provider';
import './App.css';
import StarWars from './pages/StarWars';

function App() {
  return (
    <Provider>
      <StarWars />
    </Provider>
  );
}

export default App;
