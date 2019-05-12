import React from 'react'
import './Square.css'

interface Props {
  value: string
}

interface State {}

class Square extends React.Component<Props, State> {
  render() {
    return (
      <button className="square">
        { this.props.value }
      </button>
    )
  }
}

export default Square
