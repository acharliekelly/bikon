import React, { Component } from 'react'

// import ConditionImage from './ConditionImage'
import ConditionView from './ConditionView'

/**
 * Public Properties:
 *  - selected - int: current value of condition
 *  - onChange - function(int): callback after condition change
 */
class ConditionGroup extends Component {
  constructor () {
    super()
    this.state = {
      conditionValue: 0,
      conditions: [0, 0, 0, 0, 0]
    }
    this.setConditionOn = this.setConditionOn.bind(this)
  }

  componentDidMount () {
    this.setConditionOn(this.props.selected)
  }

  setConditionOn (condition) {
    const options = []
    for (let i = 0; i < 5; i++) {
      options.push(i === (condition - 1) ? 1 : 0)
    }
    this.setState({
      conditionValue: condition,
      conditions: options
    })
    this.props.onChange(condition)
  }

  conditionLookup (condition) {
    let title = ''
    switch (condition) {
    case 1:
      title = 'Ice'
      break
    case 2:
      title = 'Snow'
      break
    case 3:
      title = 'Slush'
      break
    case 4:
      title = 'Obstruction'
      break
    case 5:
      title = 'Flood'
      break
    default:
      title = 'Unknown'
    }
    return title
  }

  render () {
    const { conditions, conditionValue } = this.state
    return (
      <div className="condition-options">
        <div className="editable">
          <span className="label">Condition: </span>
          {conditions.map((cond, i) => {
            return <ConditionView key={i} condition={i + 1} status={cond} callback={this.setConditionOn} />
          })}
          <span className="cond-value">{this.conditionLookup(conditionValue)}</span>
        </div>
      </div>
    )
  }
}

export default ConditionGroup
