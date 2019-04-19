import React, { Component } from 'react'

import MapButton from './MapButton'

import './geo.scss'

// takes element that tells user to allow location,
// and callback to take location
class BrowserLocation extends Component {
  constructor () {
    super()
    this.state = {
      nudge: true,
      position: null
    }
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
  }

  geoSuccess = position => {
    this.setState({
      nudge: false,
      position: position
    })
    if (this.props.callback) {
      this.props.callback(position)
    }
  }

  geoError = error => {
    if (error.code === error.TIMEOUT) {
      this.setState({ nudge: true })
    }
  }

  render () {
    const { position, nudge } = this.state
    if (position) {
      const { latitude, longitude } = position.coords
      return (
        <div className="geo">
          <span className="label">Your location: </span>
          <span className="label">Lat: </span>
          <span className="coord">{latitude}</span>,
          <span className="label"> Lng: </span>
          <span className="coord">{longitude}</span>
          <MapButton latitude={latitude} longitude={longitude} />
        </div>
      )
    } else if (nudge) {
      return (
        <p className="nudge">
          If you want this to be a satisfying experience, you need to let your
          browser provide your location.
        </p>
      )
    } else {
      return (
        <p className="geo">Unfortunately we were unable to get your location from your browser.</p>
      )
    }
  }
}

export default BrowserLocation
