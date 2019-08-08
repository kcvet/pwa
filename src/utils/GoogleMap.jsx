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
          title = { this.props.address }
          position = {{ lat: this.props.lat, lng: this.props.lng }}
          name = { this.props.name }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
          <Paper>
            <Typography
              variant = 'h6'
              component = 'h6'
            >
             { this.props.name }
            </Typography>
            <Typography
              component = 'p'
            >
            { this.props.address }
            </Typography>
          </Paper>
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    api: ('AIzaSyDqrwD2Ru6W_WoxM2fYTJm20vhqFYqode4')
})(GoogleMapsContainer)
