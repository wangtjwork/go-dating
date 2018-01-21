import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PlacesList extends Component {
  render() {
    return (
      <div>
        <h2>Places</h2>
        <ul className='places-list'>
          {
            this.props.places.map((place) => (
              <li key={place.id}
                className={place.id === this.props.currentID ? 'highlight-item' : ''}
                onClick={() => this.props.choosePlace(place.id)}
              >
                {place.name}
                <button>
                  <Link to={"/details/" + place.id}>
                    Details
                  </Link>
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default PlacesList
