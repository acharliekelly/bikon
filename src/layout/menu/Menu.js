import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.scss'

import Nav from 'react-bootstrap/Nav'

const authenticated = (
  <div className="panel menuPanel">
    <header>Menu</header>
    <Nav className="flex-column" variant="pills">
      <Nav.Item>
        <Link to="/reports">All Reports</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/my-reports">My Reports</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/new-report">New Report</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/filter">Filter Reports</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/plan-route">Plan Route</Link>
      </Nav.Item>
    </Nav>
  </div>
)

const unauthenticated = ''

const Menu = ({ user }) => user ? authenticated : unauthenticated

export default Menu
