import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../report.scss'

// import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

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

    const { condition, geolat, geolong, occurred, notes } = report
    return (
      <div className="report">
        <header>Condition Report</header>
        <p>Reported at: {occurred}</p>
        <p>Location: {geolat}, {geolong}</p>
        <p>Condition: {condition}</p>
        <p>Notes: {notes}</p>
        {report.editable ? this.renderButtons() : ''}
      </div>
    )
  }
}

export default withRouter(Report)
