import React, { Component } from 'react';
import './Map.css'

class GoogleMap extends Component {
  state = {
    markers: new Map(),
    map: null
  }

  componentDidMount() {
    window.initMap = this.initMap(this);

    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyDDMW81ZDUAw-o3NqnuygAGojMhJeEjA&v=3&callback=initMap');
  }

  // on props change, update the corresponding marker.
  componentDidUpdate() {
    const markers = this.state.markers;
    const map = this.state.map;
    // hide all markers and set icon back to default
    for (let [, marker] of markers) {
      marker.setMap(null);
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    }
    // show only showing places markers
    for (let place of this.props.places) {
      markers.get(place.id).setMap(map);
    }
    // set selected marker to green color
    if (this.props.currentID !== '') {
      this.state.markers.get(this.props.currentID).setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    }
  }

  // add all markers passed to the component, and giving them an icon as specified
  addMarkers = () => {
    const google = window.google;
    const map = this.state.map;
    const places = this.props.places;
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
      this.state.markers.set(place.id, marker);

      marker.addListener('click', () => this.props.choosePlace(place.id));
    }

    map.fitBounds(bounds);
  }

  // Initialize google map
  initMap(self) {
    return function() {
      const google = window.google;
      const map = new google.maps.Map(self.refs.map, {
        center: { "lat" : 30.627977, "lng" : -96.3344068 },
        zoom: 13
      });
      self.state.map = map;
      self.addMarkers();
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
