import React, { useRef } from 'react'

type Props = {
  onClick: (todo: string) => void
}

const ToDoInput: React.FC<Props> = (props: Props) => {
  const inputRef = useRef({} as HTMLInputElement)

  const clickHandler = (newTodo: string): void => {
    props.onClick(newTodo)
    inputRef.current.value = ''
  }

  const inputStyle = {
    width: '280px',
    marginRight: '16px'
  }

  return (
    <div className="siimple--text-center">
      <input
        ref={inputRef}
        type="text"
        placeholder="Input new todo"
        style={inputStyle}
        className="siimple-input siimple--bg-white"
      />
      <button
        className="siimple-btn siimple-btn--success"
        onClick={() => { clickHandler(inputRef.current.value) }}
      >
        Add
      </button>
    </div>
  )
}

export default ToDoInput
