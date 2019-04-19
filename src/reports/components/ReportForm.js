import React, { Component, Fragment } from 'react'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import ConditionGroup from './ConditionGroup'

class ReportForm extends Component {
  render () {
    const { formTitle, message, handleSubmit, handleChange, handleCondition, handleCancel, condrep } = this.props
    const { condition, geolat, geolong, occurred, notes } = condrep
    return (
      <Fragment>
        <h2 className="pageTitle">{formTitle}</h2>
        { message && <Alert variant="danger" dismissable>{message}</Alert> }
        <Form onSubmit={handleSubmit} className="reportForm">
          <Form.Group controlId="condition">
            <ConditionGroup selected={condition} onChange={handleCondition} />
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Latitude</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="geolat" type="text" defaultValue={geolat} onChange={handleChange} />
            </InputGroup>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>Longitude</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="geolong" type="text" defaultValue={geolong} onChange={handleChange} />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>When</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control name="occurred" type="date" defaultValue={occurred} onChange={handleChange} />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="notes">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control name="notes" as="textarea" defaultValue={notes} onChange={handleChange} />
          </Form.Group>
          <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
          <Button type="submit" variant="primary">Submit</Button>
        </Form>
      </Fragment>
    )
  }
}

export default ReportForm
