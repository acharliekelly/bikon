import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <NavLink to="/change-password" className="btn btn-outline-dark">Change Password</NavLink>
    <NavLink to="/sign-out" className="btn btn-outline-dark">Sign Out</NavLink>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <NavLink to="/sign-up" className="btn btn-dark">Sign Up</NavLink>
    <NavLink to="/sign-in" className="btn btn-dark">Sign In</NavLink>
  </React.Fragment>
)

const Header = ({ user }) => (
  <Row>
    <Col className="panel titlePanel">
      <h1>
        <Link to="/" className="titleLink">
          <img className={ user && 'auth'} src="bikon.png" alt="Logo" />
          BiKon
        </Link>
      </h1>
    </Col>
    <Col className="panel authenticationPanel">
      { user ? authenticatedOptions : unauthenticatedOptions }
    </Col>
  </Row>
)

export default Header
