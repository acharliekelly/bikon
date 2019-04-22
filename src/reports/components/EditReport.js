import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

import ReportForm from './ReportForm'

import { getReport, updateReport } from '../api'
import messages from '../messages'
// import ReportForm from './ReportForm'

class EditReport extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loaded: false,
      message: null,
      condrep: null
    }
  }

  componentDidMount () {
    const { alert, user } = this.props
    const id = this.props.match.params.id
    getReport(user, id)
      .then(response => this.setState({
        loaded: true,
        condrep: response.data.condrep
      }))
      .catch(() => {
        alert(messages.openReportFailure, 'danger')
      })
  }

  handleChange = event => {
    const inputName = event.target.name
    const updatedInputValue = event.target.value
    this.updateReport(inputName, updatedInputValue)
  }

  updateReport = (field, value) => {
    const updatedReport = { ...this.state.condrep, [field]: value }
    this.setState({ condrep: updatedReport })
  }

  handleConditionChange = condition => {
    this.updateReport('condition', condition)
  }

  handleSubmit = event => {
    event.preventDefault()
    const { condrep } = this.state
    const { alert, history, user } = this.props

    updateReport(user, condrep)
      .then(() => history.push('/reports/' + condrep.id))
      .then(() => alert(messages.updateReportSuccess, 'success'))
      .catch(() => {
        alert(messages.updateReportFailure, 'danger')
      })
  }

  handleCancel = event => {
    event.preventDefault()
    const { history } = this.props
    // go back
    history.go(-1)
  }

  handleMessage = msg => {
    this.setState({ message: msg })
  }

  render () {
    const { condrep, message, loaded } = this.state
    if (!loaded) {
      return <Spinner animation="grow" variant="info" />
    } else if (condrep) {
      return (
        <Fragment>
          <h2 className="pageTitle">Edit Report</h2>
          { message && <Alert variant="danger" dismissable>{message}</Alert> }
          <ReportForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleCondition={this.handleConditionChange}
            handleCancel={this.handleCancel}
            handleMessage={this.handleMessage}
            condrep={condrep}
          />
        </Fragment>
      )
    } else {
      return (
        <p>Unable to load data</p>
      )
    }
  }
}

export default withRouter(EditReport)
