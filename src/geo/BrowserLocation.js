import React, { Component } from 'react'

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

  renderLocation = () => {
    const { position } = this.state
    return (
      <div className="geo">
        <span className="label">Your location: </span>
        <span className="label">Lat: </span>
        <span className="coord">{position.coords.latitude}</span>,
        <span className="label"> Lng: </span>
        <span className="coord">{position.coords.longitude}</span>
      </div>
    )
  }

  componentDidMount () {
    navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError)
  }

  geoSuccess = position => {
    this.setState({
      nudge: false,
      position: position
    })
  }

  geoError = error => {
    switch (error.code) {
    case error.TIMEOUT:
      // user didn't allow location
      this.setState({ nudge: true })
      break
    }
  }

  render () {
    if (this.state.nudge) {
      return (
        <p className="nudge">
          If you want this to be a satisfying experience, you need to let your
          browser provide your location.
        </p>
      )
    } else {
      return this.renderLocation()
    }
  }
}

export default BrowserLocation
