import React from 'react'

const MapButton = ({ latitude, longitude }) => {
  const url = `https://www.google.com/maps/@?api=1&map_action=map&center=${latitude},${longitude}&layer=bicycle`
  return (
    <a className="btn btn-success" title="View in Google Maps"
      href={url} rel="noopener noreferrer" target="_blank">Map</a>
  )
}

export default MapButton
