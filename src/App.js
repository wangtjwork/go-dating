import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Where to go Dating?</h1>
        </header>
        <Route exact path="/" render={() => (
          <MainPage />
        )} />
      </div>
    );
  }
}

export default App;
