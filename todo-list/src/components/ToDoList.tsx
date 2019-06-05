import React from 'react'
import { ToDo } from '../types/todo'

type Props = {
  todos: Array<ToDo>,
  onRemove: (index: number) => void,
  onToggleStatus: (index: number, checked: boolean) => void,
  onToggleEditing: (index: number, isEditing: boolean) => void,
  onEdit: (index: number, newName: string) => void
}

const ToDoList: React.FC<Props> = (props: Props) => {
  const listStyle = {
    maxWidth: '90%'
  }

  const listItemStyle = {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '100%'
  }

  const itemNameStyle = {
    display: 'inline-flex',
    alignItems: 'center'
  }

  const removeBtnStyle = {
    marginLeft: '20px'
  }

  const renderTodoName = (todo: ToDo, index: number) => {
    if (todo.isEditing) {
      return (
        <input
          type="text"
          defaultValue={todo.name}
          id={"todoInput-" + index}
          placeholder="ex) Buy milk"
          className="siimple-input siimple--bg-white"
        />
      )
    } else {
      const completedStyle = {
        textDecoration: 'line-through'
      }
      const todoNameStyle = todo.completed ? completedStyle : {}

      return (
        <span style={todoNameStyle}>{todo.name}</span>
      )
    }
  }

  const renderEditButton = (todo: ToDo, index: number) => {
    if (todo.isEditing) {
      return (
        <button
          className="siimple-btn siimple-btn--success"
          onClick={() => {
            props.onEdit(index, (document.getElementById('todoInput-' + index) as HTMLInputElement).value)
            props.onToggleEditing(index, !todo.isEditing)
          }}
        >
          Update
        </button>
      )
    } else {
      return (
        <button
          className="siimple-btn siimple-btn--primary"
          onClick={() => props.onToggleEditing(index, !todo.isEditing)}
        >
          Edit
        </button>
      )
    }
  }

  const renderTodos = props.todos.map((todo, i) => {
    return (
      <li key={i} className="siimple-list-item" style={listItemStyle}>
        <div style={itemNameStyle}>
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

          {renderTodoName(todo, i)}
        </div>

        <div>
          {renderEditButton(todo, i)}

          <button
            className="siimple-btn siimple-btn--error"
            onClick={() => props.onRemove(i)}
            style={removeBtnStyle}
          >
            Remove
          </button>
        </div>
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
