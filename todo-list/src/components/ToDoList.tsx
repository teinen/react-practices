import React from 'react'
import '../style/ToDoList.css'
import { ToDo } from '../types/todo'

type Props = {
  todos: Array<ToDo>,
  onRemove: (index: number) => void,
  onToggleStatus: (index: number) => void
}

const ToDoList: React.FC<Props> = (props: Props) => {
  const renderTodos = props.todos.map((todo, i) => {
    return (
      <li key={i}>
        <input type="checkbox" onChange={() => { props.onToggleStatus(i) }}/>
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
