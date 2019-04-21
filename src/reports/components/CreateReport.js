import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'

import ReportForm from './ReportForm'
import BrowserLocation from '../../geo/BrowserLocation'

import { createReport } from '../api'
import messages from '../messages'

class CreateReport extends Component {
  constructor () {
    super()

    this.state = {
      message: null,
      condrep: {
        id: 0,
        condition: 0,
        geolat: 0,
        geolong: 0,
        occurred: Date.now(),
        notes: null
      }
    }
  }

  handleCancel = event => {
    event.preventDefault()
    const { history } = this.props
    history.push('/')
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value
    this.updateCondrep(inputName, updatedInputValue)
  }

  updateCondrep = (name, value) => {
    const updatedReport = { ...this.state.condrep, [name]: value }
    this.setState({ condrep: updatedReport })
  }

  geoSuccess = position => {
    const rep = {
      ...this.state.condrep,
      'geolat': position.coords.latitude,
      'geolong': position.coords.longitude
    }
    this.setState({ condrep: rep })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { condrep } = this.state
    const { alert, history, user } = this.props

    createReport(user, condrep)
      .then(response => this.setState({ condrep: response.data.condrep }))
      .then(() => history.push('/reports'))
      .then(() => alert(messages.newReportSuccess, 'success'))
      .catch(() => {
        alert(messages.newReportFailure, 'danger')
      })
  }

  handleConditionChange = condValue => {
    this.updateCondrep('condition', condValue)
  }

  handleMessage = msg => {
    this.setState({ message: msg })
  }

  render () {
    const { condrep, message } = this.state
    return (
      <Fragment>
        <BrowserLocation callback={this.geoSuccess} />
        <h2 className="pageTitle">Create Report</h2>
        { message && <Alert variant="danger" dismissable>{message}</Alert> }
        <ReportForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleCondition={this.handleConditionChange}
          handleCancel={this.handleCancel}
          handleMessage={this.handleMessage}
          condrep={condrep}
        />
      </Fragment>
    )
  }
}

export default withRouter(CreateReport)
