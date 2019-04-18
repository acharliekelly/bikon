import React, { Component } from 'react'

/**
 * Public Properties:
 * - id (int): value of condition
 * - img (str): image name
 * - title (str)
 * - wrapper (boolean): wrap img in div element
 * - callback (fn): onClick function
 * - active (boolean): starts out selected
 */
class ConditionImage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      active: false
    }
  }

  componentDidMount () {
    this.setState({
      active: this.props.active
    })
  }

  // handle click on image by changing state, passing id back up chain
  handleClick = () => {
    const { id, callback } = this.props
    if (callback) {
      this.setState({ active: !this.state.active })
      callback(id)
    }
  }

  render () {
    const { id, img, title, clickable, wrapper } = this.props
    const imgCls = this.state.active ? 'selected' : undefined
    const imgSrc = `images/${img}.png`
    const imgId = 'c' + id
    if (wrapper) {
      // wrap in div.condition
      const wrapperCls = 'condition' + (clickable ? ' editable' : '')
      return (
        <div className={wrapperCls}>
          <img id={imgId} alt={title} src={imgSrc} className={imgCls} onClick={this.handleClick} />
          <span className="text">{title}</span>
        </div>
      )
    } else {
      // just img
      return <img id={imgId} alt={title} src={imgSrc} className={imgCls} onClick={this.handleClick} />
    }
  }
}

export default ConditionImage
