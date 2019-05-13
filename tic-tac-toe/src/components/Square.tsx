import React from 'react'
import './Square.css'

type SquareType = number | string

interface Props {
  value: SquareType,
  onClick: () => void
}

interface State {}

class Square extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => { this.props.onClick() }}
      >
        { this.props.value }
      </button>
    )
  }
}

export default Square
