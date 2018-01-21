import React, { Component } from 'react';
import './Map.css'

class Map extends Component {
  state: {
    id: '1'
  }

  componentDidMount() {
    window.initMap = this.initMap(this);

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyDDMW81ZDUAw-o3NqnuygAGojMhJeEjA&v=3&callback=initMap');
  }

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
          animation: google.maps.Animation.DROP
        });

        bounds.extend(marker.position);
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

export default Map
