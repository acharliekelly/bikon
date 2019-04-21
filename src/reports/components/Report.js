import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../report.scss'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import ConditionView from './ConditionView'
import MapButton from '../../geo/MapButton'

import { getReport, deleteReport } from '../api'
import messages from '../messages'

class Report extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      report: null
    }
  }

  componentDidMount () {
    const { alert, user } = this.props
    const id = this.props.match.params.id
    getReport(user, id)
      .then(response => this.setState({
        loaded: true,
        report: response.data.condrep
      }))
      .catch(() => {
        alert(messages.openReportFailure, 'danger')
      })
  }

  handleDelete = event => {
    event.preventDefault()
    const { alert, history, user } = this.props
    const id = this.props.match.params.id
    deleteReport(user, id)
      .then(() => history.push('/reports'))
      .then(() => alert(messages.deleteReportSuccess, 'success'))
      .catch(() => {
        alert(messages.deleteReportFailure, 'danger')
      })
  }

  handleEdit = event => {
    event.preventDefault()
    const { history } = this.props
    const editUrl = this.props.match.url + '/edit'
    history.push(editUrl)
  }

  renderEditButtons = () => (
    <React.Fragment>
      <Button as="a" variant="primary" onClick={this.handleEdit}>Edit</Button>
      <Button as="a" variant="secondary" onClick={this.handleDelete}>Delete</Button>
    </React.Fragment>
  )

  render () {
    const { loaded, report } = this.state
    if (!loaded) {
      return <Spinner animation="grow" variant="dark" />
    }

    const { condition, when, geolat, geolong, notes, editable } = report
    return (
      <div className="report-view">
        <div className="col">
          <header>Condition Report</header>
          <div>
            <ConditionView condition={condition} wrapper />
          </div>
          <div>
            <span className="label">When: </span>
            <span className="value">{when}</span>
          </div>
          <div>
            <span className="label">Where: </span>
            <span className="value">Lat: {geolat}, Lng: {geolong}</span>
          </div>
          {notes ? (<p>Notes: {notes}</p>) : ''}
        </div>
        <div className="buttons col">
          <MapButton latitude={geolat} longitude={geolong} />
          {editable ? this.renderEditButtons() : ''}
        </div>
      </div>
    )
  }
}

export default withRouter(Report)
