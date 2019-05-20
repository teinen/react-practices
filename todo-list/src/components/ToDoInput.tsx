import React, { useRef } from 'react'
import '../style/ToDoInput.css'

interface Props {
  onClick: (todo: string) => void
}

const ToDoInput: React.FC<Props> = (props) => {
  const inputRef = useRef({} as HTMLInputElement)

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newTodo: string
  ): void => {
    e.preventDefault()
    props.onClick(newTodo)
    inputRef.current.value = ''
  }

  return (
    <div className="todo-input-container">
      <input
        ref={inputRef}
        type="text"
        placeholder="Input new todo"
        className="todo-input"
      />
      <button
        className="todo-add-btn"
        onClick={(e) => { clickHandler(e, inputRef.current.value) }}
      >
        Add
      </button>
    </div>
  )
}

export default ToDoInput
