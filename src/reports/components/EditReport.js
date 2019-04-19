import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Spinner from 'react-bootstrap/Spinner'

import ConditionGroup from './ConditionGroup'

import { getReport, updateReport } from '../api'
import messages from '../messages'
// import ReportForm from './ReportForm'

class EditReport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      message: null,
      condrep: null
    }
  }

  componentDidMount () {
    const { alert, user } = this.props
    const id = this.props.match.params.id
    getReport(user, id)
      .then(response => this.setState({
        loaded: true,
        condrep: response.data.condrep
      }))
      .catch(() => {
        alert(messages.openReportFailure, 'danger')
      })
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value
    this.updateReport(inputName, updatedInputValue)
  }

  updateReport = (field, value) => {
    const updatedReport = { ...this.state.condrep, [field]: value }
    this.setState({ condrep: updatedReport })
  }

  handleConditionChange = condition => {
    this.updateReport('condition', condition)
  }

  handleSubmit = event => {
    event.preventDefault()
    const { condrep } = this.state
    const { alert, history, user } = this.props

    updateReport(user, condrep)
      .then(() => history.push('/reports/' + condrep.id))
      .then(() => alert(messages.updateReportSuccess, 'success'))
      .catch(() => {
        alert(messages.updateReportFailure, 'danger')
      })
  }

  handleCancel = event => {
    event.preventDefault()
    const { history } = this.props
    history.push('/reports')
  }

  render () {
    const { condrep, message, loaded } = this.state
    if (!loaded) {
      return <Spinner animation="grow" variant="info" />
    } else if (condrep) {
      const { condition, geolat, geolong, occurred, notes } = condrep
      return (
        <Fragment>
          <h2 className="pageTitle">Edit Report</h2>
          { message && <Alert variant="danger" dismissable>{message}</Alert> }
          <Form onSubmit={this.handleSubmit} className="reportForm">
            <Form.Group controlId="condition">
              <ConditionGroup selected={condition} onChange={this.handleConditionChange} />
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Latitude</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name="geolat" type="text" defaultValue={geolat} onChange={this.handleChange} />
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Longitude</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name="geolong" type="text" defaultValue={geolong} onChange={this.handleChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>When</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control name="occurred" type="date" defaultValue={occurred} onChange={this.handleChange} />
              </InputGroup>
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
    } else {
      return (
        <p>Unable to load data</p>
      )
    }
  }
}

export default withRouter(EditReport)
