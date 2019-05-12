import React from 'react'
import './Square.css'

interface Props {
  value: number
}

interface State {
  value: string
}

class Square extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => { this.setState({ value: 'X' })}}
      >
        { this.state.value }
      </button>
    )
  }
}

export default Square
