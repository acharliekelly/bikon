import React, { Component } from 'react'

import ConditionImage from './ConditionImage'

/**
 * Public Properties:
 *  - selected - int: current value of condition
 *  - editable - boolean: true if part of a form
 *  - onChange - function(int): callback after condition change
 */
class ConditionGroup extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: props.selected
    }
  }

  // takes condition from ConditionImage click handler
  handleClick = condition => {
    const { editable, onChange } = this.props
    if (editable) {
      this.setState({ selected: condition })
      // pass condition up chain
      onChange(condition)
    }
  }

  render () {
    const { selected } = this.state
    return (
      <div className="condition-options">
        <div className={this.props.editable ? 'editable' : undefined}>
          <span className="label">Condition: </span>
          <ConditionImage id="1" img="ice" title="Ice" callback={this.handleClick} active={selected === 1} />
          <ConditionImage id="2" img="snow" title="Snow" callback={this.handleClick} active={selected === 2} />
          <ConditionImage id="3" img="slush" title="Slush" callback={this.handleClick} active={selected === 3} />
          <ConditionImage id="4" img="obstruct" title="Obstruction" callback={this.handleClick} active={selected === 4} />
          <ConditionImage id="5" img="flood" title="Flood" callback={this.handleClick} active={selected === 5} />
          <span className="cond-value">{this.state.selected}</span>
        </div>
      </div>
    )
  }
}

export default ConditionGroup
