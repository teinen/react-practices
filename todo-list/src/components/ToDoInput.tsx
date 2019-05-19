import React, { useState, useRef } from 'react'

interface Props {
  onClick: (todo: string) => void
}

const ToDoInput: React.FC<Props> = (props) => {
  const [newTodo, setNewTodo] = useState('')
  const inputRef = useRef({} as HTMLInputElement)

  const clickHandler = (newTodo: string): void => {
    props.onClick(newTodo)
    inputRef.current.value = ''
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Input new todo"
        onChange={(e) => { setNewTodo(e.target.value) }}
      >

      </input>
      <button onClick={() => { clickHandler(newTodo) }}>
        Add
      </button>
    </div>
  )
}

export default ToDoInput
