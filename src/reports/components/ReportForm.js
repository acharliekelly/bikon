import React, { Fragment } from 'react'

import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ConditionGroup from './ConditionGroup'

const ReportForm = (
  { formTitle, message, handleSubmit, handleChange, handleCondition, handleCancel, condition, geolat, geolong, occurred, notes }
) => (
  <Fragment>
    <h2 className="pageTitle">{formTitle}</h2>
    { message && <Alert variant="danger" dismissable>{message}</Alert> }
    <Form onSubmit={handleSubmit} className="reportForm">
      <Form.Group controlId="condition">
        <ConditionGroup selected={condition} editable={true} onChange={handleCondition} />
      </Form.Group>
      <Form.Group controlId="geolat">
        <Form.Label>Latitude</Form.Label>
        <Form.Control name="geolat" type="text" defaultValue={geolat} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="geolong">
        <Form.Label>Longitude</Form.Label>
        <Form.Control name="geolong" type="text" defaultValue={geolong} onChange={handleChange} />
      </Form.Group>
      <Form.Group controlId="reported_at">
        <Form.Label>When</Form.Label>
        <Form.Control name="reported_at" type="date" defaultValue={occurred} onChange={handleChange} />
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

export default ReportForm
