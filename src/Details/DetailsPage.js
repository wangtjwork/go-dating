import React, { Component } from 'react';
import CustomErrorPage from './CustomErrorPage';
import GoogleMap from '../GoogleMap';

class DetailsPage extends Component {
  state = {
    clientID: 'ZOPNPEUWR541DMQTG4OVO4O5OOPWZON1PHAVO5MM1151DK5X',
    clientSecret: 'NCCQX4Q251NV2MWHC4IQYDW2LQ0Q1SNFBV5LLUSCTCEIBJIU',
    reviews: null
  }

  generateFoursquareSearchRequest = (place) => {
    return 'https://api.foursquare.com/v2/venues/search?ll='
            + place.latlng.lat + ',' + place.latlng.lng
            + '&client_id=' + this.state.clientID + '&client_secret='
            + this.state.clientSecret + '&v=20180121&limit=1';
  }

  generateFoursquareTipRequest = (id) => {
    return 'https://api.foursquare.com/v2/venues/'+ id + '/tips?'
            + '&client_id=' + this.state.clientID + '&client_secret='
            + this.state.clientSecret + '&v=20180121&limit=1';
  }

  loadTips = () => {
    // const request = this.generateFoursquareSearchRequest(this.props.place[0]);
    // debugger
    // fetch(request)
    // .then(response => {
    //   return response.json();
    // })
    // .catch(() => {
    //   console.log('Accessing Foursquare failed');
    // })
    // .then(data => {
    //   return data.response.venues[0];
    // })
    // .catch(() => {
    //   console.log("We don't have this place right now");
    // })
    // .then(venue => {
    //   const tipRequest = this.generateFoursquareTipRequest(venue.id);
    //   fetch(tipRequest).then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     this.setState({
    //       reviews: data.response.tips.items
    //     });;
    //   })
    //   .catch(() => {
    //     console.log('Looks like there\'s no tips here!');
    //   })
    // })
  }

  componentDidMount() {
    //if (this.props.place.length === 1) {
      this.loadTips();
    //}
  }

  render() {
    debugger
    console.log(this.props.place.length);
    if (this.props.place.length !== 1) {
      return (
        <CustomErrorPage errorInfo='No place with this ID exists, please enter valid number from 1 to 5.'/>
      )
    }
    return (
      <div>Details</div>
      <GoogleMap places={ this.props.place } currentID={ this.props.place[0].id } choosePlace={ this.props.choosePlace } />
    )
  }
}

export default DetailsPage
