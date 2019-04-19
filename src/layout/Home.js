import React, { Fragment } from 'react'

import BrowserLocation from '../geo/BrowserLocation'

const Home = () => {
  return (
    <Fragment>
      <header className="pageTitle">Home</header>
      <BrowserLocation />
    </Fragment>
  )
}

export default Home
