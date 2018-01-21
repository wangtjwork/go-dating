import React, { Component } from 'react';
import './Map.css'

class GoogleMap extends Component {
  state = {
    markers: new Map()
  }

  componentDidMount() {
    window.initMap = this.initMap(this);

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyDDMW81ZDUAw-o3NqnuygAGojMhJeEjA&v=3&callback=initMap');
  }

  // on props change, update the corresponding marker.
  componentDidUpdate() {
    for (let [_, marker] of this.state.markers) {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }
    if (this.props.currentID !== '') {
      this.state.markers.get(this.props.currentID).setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    }
  }

  // Initialize google map with all markers passed to the component, and giving them a red icon
  initMap(self) {
    return function() {
      const google = window.google;
      const map = new google.maps.Map(self.refs.map, {
        center: { "lat" : 30.627977, "lng" : -96.3344068 },
        zoom: 13
      });
      const places = self.props.places;
      let bounds = new google.maps.LatLngBounds();
      for (let place of places) {
        const marker = new google.maps.Marker({
          map: map,
          position: place.latlng,
          title: place.name,
          animation: google.maps.Animation.DROP,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });

        bounds.extend(marker.position);
        self.state.markers.set(place.id, marker);

        marker.addListener('click', () => self.props.choosePlace(place.id));
      }

      map.fitBounds(bounds);
    }
  }

  render() {
    return (
      <div>
        <div ref="map" className="map"></div>
      </div>
    )
  }
}

function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}

export default GoogleMap
