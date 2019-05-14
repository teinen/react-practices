import React from 'react'
import './Square.css'

type Props = {
  value: string | number,
  onClick: () => void
}

const Square: React.FC<Props> = (props: Props) => {
  return (
    <button
      className="square"
      onClick={() => { props.onClick() }}
    >
      { props.value }
    </button>
  )
}

export default Square
