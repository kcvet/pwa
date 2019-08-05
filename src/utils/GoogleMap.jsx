import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import { Paper, Typography } from "@material-ui/core";

class GoogleMapsContainer extends React.Component {
  constructor(props) {
      console.log('props: ', props);
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      mylng: 0,
      mylat: 0,

    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

    latitude= (position) => {
        return position.coords.latitude;
    }
    longitude= (position) => {
        return position.coords.longitude;
    }
        l

  render() {
    const style = {
      width: '90%',
      height: '70%',
      'marginTop': "20px",
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: this.props.lat, lng: this.props.lng }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Changing Colors Garage' }
          position = {{ lat: this.props.lat, lng: this.props.lng }}
          name = { 'Changing Colors Garage' }
        />
        { navigator.geolocation  ? 
            <Marker
            onClick = { this.onMarkerClick }
            title = { 'My position' }
            position = {{ lat: navigator.geolocation.getCurrentPosition(this.latitude), lng:  navigator.geolocation.getCurrentPosition(this.longitude) }}
            name = { 'You are here' }
            /> : null
      }
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'h6'
              component = 'h6'
            >
              Changing Colors Garage
            </Typography>
            <Typography
              component = 'p'
            >
              98G Albe Dr Newark, DE 19702 <br />
              302-293-8627
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    api: ('AIzaSyD6kRzcDu5g42W62b8kHkKj0Lap6dlj6DU')
})(GoogleMapsContainer)
