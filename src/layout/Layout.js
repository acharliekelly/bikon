import React from 'react'

import Header from './header/Header'
import TimedAlert from './alert/TimedAlert'
import Menu from './menu/Menu'

import { Container, Row, Col } from 'react-bootstrap'

const Layout = ({ alerts, user, children }) => (
  <Container>
    <Header user={user} />
    <Row>
      <Col className="userMessage">
        {alerts.map((alert, index) => (
          <TimedAlert key={index} timeout="2000" dismissible
            variant={alert.type} message={alert.message} />
        ))}
      </Col>
    </Row>
    <Row>
      <Col className="col-4">
        <Menu user={user} />
      </Col>
      <Col className="col-8">
        {children}
      </Col>
    </Row>
  </Container>
)

export default Layout
