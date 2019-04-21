import React from 'react'

import ConditionImage from './ConditionImage'

const ConditionView = ({ condition, callback, status, wrapper }) => {
  let title = ''
  let src = ''
  switch (condition) {
  case 1:
    title = 'Ice'
    src = 'ice'
    break
  case 2:
    title = 'Snow'
    src = 'snow'
    break
  case 3:
    title = 'Slush'
    src = 'slush'
    break
  case 4:
    title = 'Obstruction'
    src = 'obstruct'
    break
  case 5:
    title = 'Flood'
    src = 'flood'
    break
  default:
    title = 'Unknown'
    src = 'unknown'
  }

  return (
    <ConditionImage
      id={condition}
      img={src}
      title={title}
      wrapper={wrapper}
      callback={callback}
      status={status}
    />
  )
}

export default ConditionView
