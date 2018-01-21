import React, { Component } from 'react';
import GoogleMap from '../GoogleMap'

class MainPage extends Component {
  render() {
    return (
      <GoogleMap places={ this.props.places } currentID={ this.props.currentID } choosePlace={ this.props.choosePlace }/>
    )
  }
}

export default MainPage
