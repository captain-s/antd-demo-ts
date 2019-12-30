import React from 'react';
import './App.css';
import router from './router/';

const App: React.FC = () => {
  return (
    <div className="App">
      {router()}
    </div>
  );
}

export default App;
