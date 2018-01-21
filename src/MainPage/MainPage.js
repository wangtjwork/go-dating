import React, { Component } from 'react';
import Map from '../Map'

class MainPage extends Component {
  render() {
    return (
      <Map places={this.props.places}/>
    )
  }
}

export default MainPage
