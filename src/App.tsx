import * as React from 'react';
import './App.css';
import { Store } from 'redux';

import Mastermind from './containers';

const logo = require('./logo.svg');

export const App = function({ state }) {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.tsx</code> and save to reload.
      </p>
      <Mastermind state={state}/>
    </div>
  );
};

export default App;
