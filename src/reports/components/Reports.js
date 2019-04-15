import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'

import { allReports } from '../api'
import messages from '../messages'

class Reports extends Component {
  constructor (props) {
    super(props)

    this.state = {
      reports: []
    }
  }

  componentDidMount () {
    allReports()
      .then(() => alert(messages.indexSuccess, 'success'))
      .then(response => this.setState({
        reports: response.data.reports
      }))
      .catch(error => {
        console.error(error)
        alert(messages.indexFailure, 'danger')
      })
  }

  render () {
    const { reports } = this.state
    if (reports.length === 0) {
      return <Spinner animation="grow" variation="dark" />
    } else {
      return (
        <Fragment>
          <h3>Condition Reports</h3>
          <ul>
            {reports.map(report => (
              <li key={report.id}>
                <Link to={'/reports/' + report.id}>Report {report.id}</Link>
              </li>
            ))}
          </ul>
        </Fragment>
      )
    }
  }
}

export default Reports
