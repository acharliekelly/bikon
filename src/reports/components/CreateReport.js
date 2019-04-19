import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'

import ConditionGroup from './ConditionGroup'
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

  render () {
    const { condrep, message } = this.state
    const { condition, geolat, geolong, occurred, notes } = condrep
    return (
      <Fragment>
        <BrowserLocation callback={this.geoSuccess} />
        <h2 className="pageTitle">Create Report</h2>
        { message && <Alert variant="danger" dismissable>{message}</Alert> }
        <Form onSubmit={this.handleSubmit} className="reportForm">
          <Form.Group controlId="condition">
            <ConditionGroup selected={condition} onChange={this.handleConditionChange} />
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Latitude</InputGroup.Text>
                  </InputGroup.Prepend>
                  <input name="geolat" className="form-control" type="number" min="-90.0" max="90.0" step="any"
                    value={geolat} autoComplete onChange={this.handleChange} />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Longitude</InputGroup.Text>
                  </InputGroup.Prepend>
                  <input name="geolong" className="form-control" type="number" min="-180.0" max="180.0" step="any"
                    value={geolong} autoComplete onChange={this.handleChange} />
                </InputGroup>
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>When</InputGroup.Text>
              </InputGroup.Prepend>
              <input name="occurred" type="datetime-local" value={occurred} onChange={this.handleChange} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="notes">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Other Info</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="notes" as="textarea" defaultValue={notes} onChange={this.handleChange} />
            </InputGroup>
          </Form.Group>
          <Button type="button" variant="secondary" onClick={this.handleCancel}>Cancel</Button>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(CreateReport)
