import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage.js';
import DetailsPage from './Details/DetailsPage.js';
import './App.css';

class App extends Component {
  state = {
    places: [
      {
        name: 'Spirit Ice Arena',
        latlng: {
           "lat" : 30.617285,
           "lng" : -96.30961499999999
        },
        id: "1"
      },
      {
        name: 'Lake Bryan',
        latlng: {
           "lat" : 30.7120011,
           "lng" : -96.4730443
        },
        id: "2"
      },
      {
        name: 'Grand Station Entertainment',
        latlng: {
           "lat" : 30.62065249999999,
           "lng" : -96.29874
        },
        id: "3"
      },
      {
        name: 'Cinemark Movies 18 and XD',
        latlng: {
           "lat" : 30.635599,
           "lng" : -96.3030481
        },
        id: "4"
      },
      {
        name: 'Amico Nave Ristorante',
        latlng: {
           "lat" : 30.640156,
           "lng" : -96.35650299999999
        },
        id: "5"
      }
    ],
    currentID: ''
  }

  choosePlaceID= (id) => {
    this.setState({
      currentID: id
    });
    console.log(this.state.currentID);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Where to go Dating?</h1>
        </header>
        <Route exact path="/" render={() => (
          <MainPage places={ this.state.places } currentID={ this.state.currentID } choosePlace={this.choosePlaceID}/>
        )} />
        <Route path="/details/:id" component={(whole) => (
          <DetailsPage place={ this.state.places.filter(p => p.id === whole.match.params.id) } />
        )} />
      </div>
    );
  }
}

export default App;
