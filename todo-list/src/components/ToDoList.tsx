import React from 'react'
import '../style/ToDoList.css'
import { ToDo } from '../types'

type Props = {
  todos: Array<ToDo>,
  onRemove: (index: number) => void,
  // onToggleStatus: () => void
}

const ToDoList: React.FC<Props> = (props: Props) => {
  const renderTodos = props.todos.map((todo, i) => {
    return (
      <li key={i}>
        {todo.name}, state: {todo.completed.toString()}
        <button onClick={() => props.onRemove(i)}>
          Remove
        </button>
      </li>
    )
  })

  return (
    <ul>
      {renderTodos}
    </ul>
  )
}

export default ToDoList
