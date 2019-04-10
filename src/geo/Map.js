import React from 'react'
import ReactDOM from 'react-dom'

export class Map extends React.Component {
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
