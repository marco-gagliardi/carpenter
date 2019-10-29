import React, {Component} from 'react'

class ErrorHandler extends Component {
  constructor (props) {
    super(props);
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError (error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch (error, info) {
    console.error('Application error: ', error, info)
  }

  render () {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <span>Something went wrong</span>
      )
    }
    return this.props.children
  }
}

export default ErrorHandler