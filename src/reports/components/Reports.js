import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

// import Spinner from 'react-bootstrap/Spinner'

import { allReports, myReports } from '../api'
import messages from '../messages'

class Reports extends Component {
  constructor (props) {
    super(props)

    this.state = {
      condreps: []
    }
  }

  componentDidMount () {
    const { alert, user, own } = this.props
    if (own) {
      myReports(user)
        .then(response => this.setState({ condreps: response.data.condreps }))
        .catch(error => {
          console.error(error)
          alert(messages.myReportsFailure, 'danger')
        })
    } else {
      allReports(user)
        .then(response => this.setState({ condreps: response.data.condreps }))
        .catch(error => {
          console.error(error)
          alert(messages.indexFailure, 'danger')
        })
    }
  }

  render () {
    const { condreps } = this.state
    if (typeof condreps === 'undefined') {
      return <div className="no-data">No records</div>
    } else if (condreps.length === 0) {
      // return <Spinner animation="grow" variation="dark" />
      return 'Loading...'
    } else {
      return (
        <Fragment>
          <h3>Condition Reports</h3>
          <ul className="reports-list">
            {condreps.map(condrep => (
              <li key={condrep.id}>
                <Link className={condrep.editable ? 'mine' : 'other'} to={'/reports/' + condrep.id}>Report {condrep.id}</Link>
              </li>
            ))}
          </ul>
        </Fragment>
      )
    }
  }
}

export default Reports
