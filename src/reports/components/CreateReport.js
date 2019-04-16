import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { createReport } from '../api'
import messages from '../messages'
import ReportForm from './ReportForm'

class CreateReport extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      created: false,
      message: null,
      report: {
        id: 0,
        condition: 0,
        latitude: 0,
        longitude: 0,
        timestamp: Date.now(),
        notes: null
      }
    }
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value

    const updatedReport = { ...this.state.report, [inputName]: updatedInputValue }

    this.setState({ report: updatedReport })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { report } = this.state
    const { alert, history, user } = this.props

    createReport(user, report)
      .then(() => alert(messages.newReportSuccess, 'success'))
      .then(() => this.setState({ created: true }))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        alert(messages.newReportFailure, 'danger')
      })
  }

  render () {
    const { report, created, message } = this.state

    if (created) {
      // redirect to report.id
      return <Redirect to={'/reports/' + report.id} />
    } else {
      const { condition, latitude, longitude, timestamp, notes } = report
      return (
        <ReportForm
          formTitle="New Report"
          message={message}
          condition={condition}
          latitude={latitude}
          longitude={longitude}
          timestamp={timestamp}
          notes={notes}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
}

export default withRouter(CreateReport)
