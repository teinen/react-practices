import React from 'react'
import { ToDo } from '../types/todo'

type Props = {
  todos: Array<ToDo>,
  onRemove: (index: number) => void,
  onToggleStatus: (index: number, checked: boolean) => void
  onEdit: (index: number, newName: string) => void
}

const ToDoList: React.FC<Props> = (props: Props) => {
  const listStyle = {
    width: 'auto' // overwrite
  }

  const renderTodos = props.todos.map((todo, i) => {
    return (
      <li key={i} className="siimple-list-item">
        <label className="siimple-label"></label>
        <div className="siimple-checkbox">
          <input
            type="checkbox"
            id={"checkTodo-" + i}
            checked={todo.completed}
            onChange={(e) => props.onToggleStatus(i, e.target.checked)}
          />
          <label htmlFor={"checkTodo-" + i}></label>
        </div>

        { todo.name }

        <button
          className="siimple-btn siimple-btn--primary"
          onClick={() => props.onEdit(i, 'hoge')}
        >
          Edit
        </button>
        <button
          className="siimple-btn siimple-btn--error"
          onClick={() => props.onRemove(i)}
        >
          Remove
        </button>
      </li>
    )
  })

  return (
    <ul className="siimple-list" style={listStyle}>
      {renderTodos}
    </ul>
  )
}

export default ToDoList
