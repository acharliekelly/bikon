import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.scss'

import Nav from 'react-bootstrap/Nav'

const authenticated = (
  <div className="panel menuPanel">
    <header>Menu</header>
    <Nav className="flex-column" variant="pills">
      <Nav.Item>
        <NavLink to="/reports" exact activeClassName="selected">All Reports</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/my-reports" exact activeClassName="selected">My Reports</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/new-report" exact activeClassName="selected">New Report</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/filter" exact activeClassName="selected">Filter Reports</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/plan-route" exact activeClassName="selected">Plan Route</NavLink>
      </Nav.Item>
    </Nav>
  </div>
)

const unauthenticated = ''

const Menu = ({ user }) => user ? authenticated : unauthenticated

export default Menu
