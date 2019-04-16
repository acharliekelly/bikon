import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
// import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { createReport } from '../api'
import messages from '../messages'
// import ReportForm from './ReportForm'

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

  handleSubmit = event => {
    event.preventDefault()
    const { condrep } = this.state
    const { alert, history, user } = this.props

    createReport(user, condrep)
      .then(response => this.setState({ condrep: response.data.condrep }))
      .then(() => alert(messages.newReportSuccess, 'success'))
      .then(() => history.push('/reports/' + condrep.id))
      .catch(error => {
        console.error(error)
        alert(messages.newReportFailure, 'danger')
      })
  }

  condIce = event => {
    event.preventDefault()
    this.updateCondrep('condition', 1)
  }

  condSnow = event => {
    event.preventDefault()
    this.updateCondrep('condition', 2)
  }

  condSlush = event => {
    event.preventDefault()
    this.updateCondrep('condition', 3)
  }

  condObst = event => {
    event.preventDefault()
    this.updateCondrep('condition', 4)
  }

  render () {
    const { condrep, message } = this.state
    const { condition, geolat, geolong, occurred, notes } = condrep
    return (
      <Fragment>
        <h2 className="pageTitle">Create Report</h2>
        { message && <Alert variant="danger" dismissable>{message}</Alert> }
        <Form onSubmit={this.handleSubmit} className="reportForm">
          <Form.Group controlId="condition">
            <Form.Label>Condition</Form.Label>
            <Button variant="primary" id="cond1" name="condition" onClick={this.condIce} active={condition === 1}>Ice</Button>
            <Button variant="info" id="cond2" name="condition" onClick={this.condSnow} active={condition === 2}>Snow</Button>
            <Button variant="secondary" id="cond3" name="condition" onClick={this.condSlush} active={condition === 3}>Slush</Button>
            <Button variant="dark" id="cond4" name="condition" onClick={this.condObst} active={condition === 4}>Obstruction</Button>
          </Form.Group>
          <Form.Group controlId="geolat">
            <Form.Label>Latitude</Form.Label>
            <Form.Control name="geolat" type="text" defaultValue={geolat} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="geolong">
            <Form.Label>Longitude</Form.Label>
            <Form.Control name="geolong" type="text" defaultValue={geolong} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="occurred">
            <Form.Label>When</Form.Label>
            <Form.Control name="occurred" type="date" defaultValue={occurred} onChange={this.handleChange} />
          </Form.Group>
          <Form.Group controlId="notes">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control name="notes" as="textarea" defaultValue={notes} onChange={this.handleChange} />
          </Form.Group>
          <Button type="button" variant="secondary" onClick={this.handleCancel}>Cancel</Button>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CreateReport)
