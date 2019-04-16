import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

// import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

import { getReport, deleteReport } from '../api'
import messages from '../messages'

class Report extends Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user,
      report: null,
      edit: false,
      delete: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    const user = this.props.user
    getReport(user, id)
      .then(() => alert(messages.openReportSuccess, 'success'))
      .then(response => this.setState({
        report: response.data.report
      }))
      .catch(error => {
        console.error(error)
        alert(messages.openReportFailure, 'danger')
      })
  }

  handleDelete = event => {
    event.preventDefault()
    const id = this.props.match.params.id
    const user = this.state.user
    deleteReport(user, id)
      .then(() => alert(messages.deleteReportSuccess, 'success'))
      .then(() => this.setState({
        del: true
      }))
      .catch(error => {
        console.error(error)
        alert(messages.deleteReportFailure, 'danger')
      })
  }

  handleEdit = event => {
    event.preventDefault()
    this.setState({
      edit: true
    })
  }

  render () {
    const { report, del, edit } = this.state
    if (!report) {
      return <h4>Loading...</h4>
    }
    if (del) {
      return <Redirect to='/reports' />
    }
    if (edit) {
      return <Redirect to={this.props.match.url + '/edit'} />
    }

    // const { condition, latitude, longitude, timestamp, notes } = report
    return (
      <Fragment>
        <div className="report">
          <h3>Condition Report</h3>
          <div className="todo">
            Condition Report Info
          </div>
        </div>
        <Button onClick={this.handleEdit}>Edit</Button>
        <Button onClick={this.handleDelete}>Delete</Button>
      </Fragment>
    )
  }
}

export default withRouter(Report)
