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
      loaded: false,
      condreps: []
    }
  }

  componentDidMount () {
    const { alert, user, own } = this.props
    if (own) {
      myReports(user)
        .then(response => this.setState({
          loaded: true,
          condreps: response.data.condreps
        }))
        .catch(() => {
          alert(messages.indexFailure, 'danger')
        })
    } else {
      allReports(user)
        .then(response => this.setState({
          loaded: true,
          condreps: response.data.condreps
        }))
        .catch(() => {
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
    const { loaded, condreps } = this.state
    if (!loaded) {
      return <Spinner animation="grow" variation="dark" />
    } else if (condreps.length === 0) {
      // axios is finished loading, but there is no data
      return <div className="no-data">No records</div>
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
                    <ConditionView condition={condrep.condition} wrapper />
                  </td>
                  <td>{this.getLink(condrep.id, condrep.when)}</td>
                  <td>
                    Lat: {this.getLink(condrep.id, condrep.geolat)} <br/>
                    Lng: {this.getLink(condrep.id, condrep.geolong)}
                  </td>
                  <td>{this.getLink(condrep.id, condrep.email)}</td>
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
