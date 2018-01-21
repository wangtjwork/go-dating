import React, { Component } from 'react';
import Map from '../Map'

class MainPage extends Component {
  render() {
    // if (this.props.places.length !== 1) {
    //   return (
    //     <CustomErrorPage info='No place with this ID exists, please enter valid number from 1 to 5.'/>
    //   )
    // }
    return (
      <Map places={this.props.places}/>
    )
  }
}

export default MainPage
