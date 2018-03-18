import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class PlacesList extends Component {
  render() {
    return (
      <div>
        <ul className='places-list'>
          <li className="list-head">
            <h2 className="list-text">Places</h2>
            <select className="list-function" onChange={ (event) => this.props.updateFilter(event.target.value)}>
              <option value="all">All places</option>
              <option value="lessThanFifteen">SPH &lt; 15</option>
              <option value="moreThanFifteen">SPH &ge; 15</option>
            </select>
          </li>
          {
            this.props.places.map((place) => (
              <li key={place.id}
                className={place.id === this.props.currentID ? 'highlight-item' : ''}
                onClick={() => this.props.choosePlace(place.id)}
              >
                <span className="list-text">{place.name}</span>
                <button className="list-function">
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
