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
        self.state.markers.set(place.id, marker);

        marker.addListener('click', () => self.props.choosePlace(place.id));
      }

      map.fitBounds(bounds);
    }
  }

  makeMarkerIcon(markerColor) {
    const google = window.google;
    const markerImage = new google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
      '|40|_|%E2%80%A2',
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34),
      new google.maps.Size(21,34));
    return markerImage;
  }

  componentDidUpdate() {
    if (this.props.currentID !== '') {
      this.state.markers.get(this.props.currentID).setIcon(this.makeMarkerIcon('FFFF24'));
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
