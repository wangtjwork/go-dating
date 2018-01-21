import React, { Component } from 'react';
import GoogleMap from '../GoogleMap';
import PlacesList from './PlacesList';

class MainPage extends Component {
  render() {
    return (
      <div>
        <GoogleMap places={ this.props.places } currentID={ this.props.currentID } choosePlace={ this.props.choosePlace }/>
        <PlacesList places={ this.props.places } currentID={ this.props.currentID } choosePlace={ this.props.choosePlace } updateFilter= { this.props.updateFilter }/>
      </div>
    )
  }
}

export default MainPage
