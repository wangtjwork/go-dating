import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomErrorPage from '../CustomErrorPage';
import GoogleMap from '../GoogleMap';

class DetailsPage extends Component {
  state = {
    clientID: 'ZOPNPEUWR541DMQTG4OVO4O5OOPWZON1PHAVO5MM1151DK5X',
    clientSecret: 'NCCQX4Q251NV2MWHC4IQYDW2LQ0Q1SNFBV5LLUSCTCEIBJIU',
    reviews: []
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
            + this.state.clientSecret + '&v=20180121&sort=popular&limit=10';
  }

  loadTips = () => {
    const request = this.generateFoursquareSearchRequest(this.props.place[0]);
    fetch(request)
    .then(response => {
      return response.json();
    })
    .catch(() => {
      console.log('Accessing Foursquare failed');
    })
    .then(data => {
      return data.response.venues[0];
    })
    .catch(() => {
      console.log("We don't have this place right now");
    })
    .then(venue => {
      const tipRequest = this.generateFoursquareTipRequest(venue.id);
      return fetch(tipRequest);
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        reviews: data.response.tips.items.slice(0,3)
      });
    })
    .catch(() => {
      console.log('Looks like there\'s no tips here!');
    })
  }

  componentDidMount() {
    if (this.props.place.length === 1) {
      this.loadTips();
    }
  }

  render() {
    if (this.props.place.length !== 1) {
      return (
        <CustomErrorPage errorInfo='No place with this ID exists, please enter valid number from 1 to 5.'/>
      )
    }
    return (
      <div>
        <div className="list-head">
          <Link to="/" className='return-to-main-page'>Return</Link>
          <h2>{this.props.place[0].name}</h2>
        </div>
        <ul className="reviews">
          {
            this.state.reviews.map((review) => {
              return (
                <li key={review.id}>
                  {review.text}
                </li>
              );
            })
          }
        </ul>
        <GoogleMap places={ this.props.place } currentID={ this.props.place[0].id } choosePlace={ this.props.choosePlace } />
      </div>
    )
  }
}

export default DetailsPage
