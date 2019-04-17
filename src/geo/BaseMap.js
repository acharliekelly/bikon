import React from 'react'
// import ReactDOM from 'react-dom'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

// const mapKey = process.env.MAPS_API_KEY

const BaseMap = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 42.3542762, lng: -71.0538729 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 42.3542762, lng: -71.0538729 }} />}
  </GoogleMap>
))

export default BaseMap
