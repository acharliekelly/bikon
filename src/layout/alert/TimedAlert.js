import React from 'react'
import Alert from 'react-bootstrap/Alert'

class TimedAlert extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      show: true,
      intervalId: null
    }
  }

  componentDidMount () {
    // store the intervalId in the state so it can be used later
    const intervalId = setInterval(this.handleHide, this.props.timeout)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount () {
    // clear the timer
    clearInterval(this.state.intervalId)
  }

  handleHide = () => {
    this.setState({ show: false })
    clearInterval(this.state.intervalId)
  }

  render () {
    // const handleShow = () => this.setState({ show: true })
    const { variant, message, className } = this.props
    return (
      <Alert className={className} show={this.state.show} onClose={this.handleHide} dismissible variant={variant}>
        <Alert.Heading>{variant}</Alert.Heading>
        <p>{message}</p>
      </Alert>
    )
  }
}

export default TimedAlert
