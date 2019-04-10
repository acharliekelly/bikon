import React from 'react'
import { GoogleApiWrapper } from 'google-maps-react'

const mapKey = process.env.MAPS_API_KEY

// Code goes here 42.3542762,-71.0538729

export class MapContainer extends React.Component {}

export default GoogleApiWrapper({
  apiKey: (mapKey)
})(MapContainer)
