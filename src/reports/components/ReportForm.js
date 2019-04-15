import React, { Fragment } from 'react'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const ReportForm = (
  { formTitle, message, handleSubmit, handleChange, condition, latitude, longitude, timestamp, notes }
) => (
  <Fragment>
    <h2 className="pageTitle">{formTitle}</h2>
    { message && <Alert variant="danger" dismissable>{message}</Alert> }
    <Form onSubmit={handleSubmit} className="reportForm">
      <Form.Group controlId="condition">
        <Form.Label>Condition</Form.Label>
        <Form.Check type="radio">
          <Form.Check.Input id="cond1" label="Ice" />
          <Form.Check.Input id="cond2" label="Snow" />
          <Form.Check.Input id="cond3" label="Slush" />
          <Form.Check.Input id="cond4" label="Obstruction" />
        </Form.Check>
      </Form.Group>
      <Form.Group controlId="latitude">
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="longitude">
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="text" />
      </Form.Group>
      <Form.Group controlId="timestamp">
        <Form.Label>When</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
      <Form.Group controlId="notes">
        <Form.Label>Additional Info</Form.Label>
        <Form.Control as="textarea" />
      </Form.Group>
      <Button type="button" variant="secondary">Cancel</Button>
      <Button type="submit" variant="primary">Submit</Button>
    </Form>
  </Fragment>
)

export default ReportForm
