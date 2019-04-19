import React from 'react'

const MapButton = ({ latitude, longitude }) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}&layer=bicycle`
  return (
    <a className="btn btn-success" title="View in Google Maps"
      href={url} rel="noopener noreferrer" target="_blank">Map</a>
  )
}

export default MapButton
