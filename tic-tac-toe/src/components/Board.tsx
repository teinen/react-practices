import React from 'react'
import Square from './Square'
import './Board.css'

interface Props {}

interface State {
  squares: Array<number>
}

class Board extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  status = 'Next player: X'

  renderSquare(i: number) {
    return <Square value={ this.state.squares[i] } />
  }

  render() {
    return (
      <div>
        <div className="status">
          { this.status }
        </div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    )
  }
}

export default Board
