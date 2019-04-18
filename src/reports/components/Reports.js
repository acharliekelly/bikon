import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Table from 'react-bootstrap/Table'

import ConditionView from './ConditionView'
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

  getLink = (id, content) => {
    return (
      <Link to={'/reports/' + id}>{content}</Link>
    )
  }

  render () {
    const { condreps } = this.state
    if (typeof condreps === 'undefined') {
      return <div className="no-data">No records</div>
    } else if (condreps.length === 0) {
      return <Spinner animation="grow" variation="dark" />
    } else {
      return (
        <Fragment>
          <header>Condition Reports</header>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>What</th>
                <th>When</th>
                <th>Where</th>
                <th>Who</th>
              </tr>
            </thead>
            <tbody>
              {condreps.map(condrep => (
                <tr key={condrep.id} className={condrep.editable ? 'mine' : 'other'}>
                  <td>{this.getLink(condrep.id, condrep.id)}</td>
                  <td>
                    <ConditionView condition={condrep.condition} />
                  </td>
                  <td>{this.getLink(condrep.id, condrep.occurred)}</td>
                  <td>
                    Lat: {this.getLink(condrep.id, condrep.geolat)} <br/>
                    Lng: {this.getLink(condrep.id, condrep.geolong)}
                  </td>
                  <td>{this.getLink(condrep.id, condrep.editable ? 'Me' : 'Somebody')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      )
    }
  }
}

export default Reports
