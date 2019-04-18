import React, { Component } from 'react'
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

// import messages from './messages'

// Shows where a report occurred
class ReportMap extends Component {
  render () {
    const gMap = withGoogleMap(props => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 42.3542762, lng: -71.0538729 }}
      >
        <Marker position={{ lat: 42.3542762, lng: -71.0538729 }} />
      </GoogleMap>
    ))
    return (
      <div>
        <gMap
          containerElement={ <div style={{ height: '500px', width: '500px' }} /> }
          mapElement={ <div style={{ height: '100%' }} /> }
        />
      </div>
    )
  }
}

export default ReportMap
