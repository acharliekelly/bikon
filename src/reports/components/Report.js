import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../report.scss'

// import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import ConditionView from './ConditionView'

import { getReport, deleteReport } from '../api'
import messages from '../messages'

class Report extends Component {
  constructor (props) {
    super(props)

    this.state = {
      report: null
    }
  }

  componentDidMount () {
    const { alert, user } = this.props
    const id = this.props.match.params.id
    getReport(user, id)
      .then(response => this.setState({ report: response.data.condrep }))
      .catch(error => {
        console.error(error)
        alert(messages.openReportFailure, 'danger')
      })
  }

  getMapLink = () => {
    const { geolat, geolong } = this.state.report
    const url = `https://www.google.com/maps/@${geolat},${geolong},14z`
    return (
      <a className="gmap" href={url} target="_blank" rel="noopener noreferrer">
        Lat: {geolat}, Lng: {geolong}
      </a>
    )
  }

  handleDelete = event => {
    event.preventDefault()
    const { alert, history, user } = this.props
    const id = this.props.match.params.id
    deleteReport(user, id)
      .then(() => alert(messages.deleteReportSuccess, 'success'))
      .then(() => history.push('/reports'))
      .catch(error => {
        console.error(error)
        alert(messages.deleteReportFailure, 'danger')
      })
  }

  handleEdit = event => {
    event.preventDefault()
    const { history } = this.props
    const editUrl = this.props.match.url + '/edit'
    history.push(editUrl)
  }

  renderButtons = () => (
    <React.Fragment>
      <Button className="btn-primary" onClick={this.handleEdit}>Edit</Button>
      <Button className="btn-secondary" onClick={this.handleDelete}>Delete</Button>
    </React.Fragment>
  )

  render () {
    const { report } = this.state
    if (!report) {
      return <h4>Loading...</h4>
    }

    const { condition, when, notes, editable } = report
    return (
      <div className="report-view">
        <header>Condition Report</header>
        <p>
          <ConditionView condition={condition} wrapper />
        </p>
        <p>
          <span className="label">When: </span>
          <span className="value">{when}</span>
        </p>
        <p>
          <span className="label">Where: </span>
          {this.getMapLink()}
        </p>
        {notes ? (<p>Notes: {notes}</p>) : ''}
        {editable ? this.renderButtons() : ''}
      </div>
    )
  }
}

export default withRouter(Report)
