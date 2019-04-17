import React, { Component } from 'react'
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { GoogleMap, Marker } from 'react-google-maps'

import { getReport } from '../reports/api'
// import messages from './messages'

class ReportMap extends Component {
  constructor (props) {
    super(props)

    this.state = {
      report: null
    }
  }

  componentDidMount () {
    const { user } = this.props
    const reportId = this.props.match.params.id
    getReport(user, reportId)
      .then(response => this.setState({ report: response.data.condrep }))
      .catch(error => { console.log(error) })
  }

  render () {
    const { report } = this.state
    if (!report) {
      return 'Loading...'
    } else {
      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 42.3542762, lng: -71.0538729 }}
        >
          <Marker position={{ lat: 42.3542762, lng: -71.0538729 }} />
        </GoogleMap>
      )
    }
  }
}

export default ReportMap
