import React from 'react'
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react'

const mapStyles = {
  width: 100%,
  height: 100%
}

const mapKey = process.env.MAPS_API_KEY

export class Map extends React.Component {
  state = {
    showInfoWindow: false, // show or hide the info window
    activeMarker: {}, // 
    selectedPlace: {}
  }
  loadMap () {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      const zoom = 14
      const lat = 42.3542762
      const lng = -71.0538729
      const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig)
    }
  }
}

export default GoogleApiWrapper({
  apiKey: (mapKey)
})(MapContainer)
