import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col'

import ConditionGroup from './ConditionGroup'

class ReportForm extends Component {
  constructor (...args) {
    super(...args)
    this.state = {
      validated: false
    }
  }

  onSubmit = event => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      const msg = 'Please complete all required fields'
      this.props.handleMessage(msg)
    } else {
      this.props.handleSubmit(event)
    }
    this.setState({ validated: true })
  }

  render () {
    const { validated } = this.state
    const { handleChange, handleCondition, handleCancel, condrep } = this.props
    const { condition, geolat, geolong, occurred, notes } = condrep
    return (
      <Form noValidate validated={validated} onSubmit={this.onSubmit} className="reportForm">
        <Form.Group controlId="condition">
          <ConditionGroup selected={condition} onChange={handleCondition} />
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Latitude *</InputGroup.Text>
                </InputGroup.Prepend>
                <input required name="geolat" className="form-control" type="number" min="-90.0" max="90.0" step="any"
                  value={geolat} onChange={handleChange} />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>Longitude *</InputGroup.Text>
                </InputGroup.Prepend>
                <input required name="geolong" className="form-control" type="number" min="-180.0" max="180.0" step="any"
                  value={geolong} onChange={handleChange} />
              </InputGroup>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>When *</InputGroup.Text>
                </InputGroup.Prepend>
                <input required name="occurred" type="datetime-local" value={occurred} onChange={handleChange} />
              </InputGroup>
            </Col>
            <Col>
              <span className="currentDateValue">{condrep.when}</span>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId="notes">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>Other Info</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control name="notes" as="textarea" defaultValue={notes} onChange={handleChange} />
          </InputGroup>
        </Form.Group>
        <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    )
  }
}

export default ReportForm
