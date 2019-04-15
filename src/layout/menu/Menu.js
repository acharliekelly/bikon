import React from 'react'
import './Menu.scss'

import Nav from 'react-bootstrap/Nav'

const authenticated = (
  <div className="panel menuPanel">
    <header>Menu</header>
    <Nav className="flex-column" variant="pills">
      <Nav.Item>
        <Nav.Link href="/reports">All Reports</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/my-reports">My Reports</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/new-report">New Report</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/filter">Filter Reports</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/plan-route">Plan Route</Nav.Link>
      </Nav.Item>
    </Nav>
  </div>
)

const unauthenticated = ''

const Menu = ({ user }) => user ? authenticated : unauthenticated

export default Menu
