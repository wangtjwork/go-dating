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
        id: "1",
        sph: 15
      },
      {
        name: 'Lake Bryan',
        latlng: {
           "lat" : 30.7120011,
           "lng" : -96.4730443
        },
        id: "2",
        sph: 8
      },
      {
        name: 'Grand Station Entertainment',
        latlng: {
           "lat" : 30.62065249999999,
           "lng" : -96.29874
        },
        id: "3",
        sph: 23
      },
      {
        name: 'Cinemark Movies 18 and XD',
        latlng: {
           "lat" : 30.635599,
           "lng" : -96.3030481
        },
        id: "4",
        sph: 12
      },
      {
        name: 'Amico Nave Ristorante',
        latlng: {
           "lat" : 30.640156,
           "lng" : -96.35650299999999
        },
        id: "5",
        sph: 20
      }
    ],
    currentID: '',
    filterOption: 'all'
  }

  choosePlaceID = (id) => {
    this.setState({
      currentID: id
    });
  }

  updateFilterOption = (value) => {
    this.setState({
      filterOption: value
    });
  }

  render() {
    let showingPlaces = this.state.places;
    if (this.state.filterOption === 'lessThanFifteen') {
      showingPlaces = showingPlaces.filter(place => place.sph < 15);
    } else if (this.state.filterOption === 'moreThanFifteen') {
      showingPlaces = showingPlaces.filter(place => place.sph >= 15);
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Where to go Dating?</h1>
        </header>
        <Route exact path="/" render={() => (
          <MainPage places={ showingPlaces } currentID={ this.state.currentID } choosePlace={this.choosePlaceID} updateFilter={ this.updateFilterOption }/>
        )} />
        <Route path="/details/:id" component={(whole) => (
          <DetailsPage place={ this.state.places.filter(p => p.id === whole.match.params.id) } />
        )} />
      </div>
    );
  }
}

export default App;
