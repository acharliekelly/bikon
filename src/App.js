import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

// import Home from './layout/Home'
import TimedAlert from './layout/alert/TimedAlert'
import Header from './layout/header/Header'
import Menu from './layout/menu/Menu'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Reports from './reports/components/Reports'
// import MyReports from './reports/components/MyReports'
import Report from './reports/components/Report'
import CreateReport from './reports/components/CreateReport'
import EditReport from './reports/components/EditReport'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Container>
        <Header user={user} />
        <Row>
          <Col className="col-4">
            <Menu user={user} />
          </Col>
          <Col className="col-8">
            <Container>
              <Row>
                <Col className="userMessage">
                  {alerts.map((alert, index) => (
                    <TimedAlert key={index} timeout="2000" dismissible
                      variant={alert.type} message={alert.message} />
                  ))}
                </Col>
              </Row>
              <Row>
                <Col className="content-display">
                  { /* }<AuthenticatedRoute user={user} exact path='/' component={Home} /> */ }
                  <Route path='/sign-up' render={() => (
                    <SignUp alert={this.alert} setUser={this.setUser} />
                  )} />
                  <Route path='/sign-in' render={() => (
                    <SignIn alert={this.alert} setUser={this.setUser} />
                  )} />
                  <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                    <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
                  )} />
                  <AuthenticatedRoute user={user} path='/change-password' render={() => (
                    <ChangePassword alert={this.alert} user={user} />
                  )} />
                  <AuthenticatedRoute user={user} exact path='/reports' render={() => (
                    <Reports alert={this.alert} user={user} own={false} />
                  )} />
                  <AuthenticatedRoute user={user} exact path='/my-reports' render={() => (
                    <Reports alert={this.alert} user={user} own={true} />
                  )} />
                  <AuthenticatedRoute user={user} path='/new-report' render={() => (
                    <CreateReport alert={this.alert} user={user} />
                  )} />
                  <AuthenticatedRoute user={user} exact path='/reports/:id' render={() => (
                    <Report alert={this.alert} user={user} />
                  )} />
                  <AuthenticatedRoute user={user} exact path='/reports/:id/edit' render={() => (
                    <EditReport alert={this.alert} user={user} />
                  )} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
