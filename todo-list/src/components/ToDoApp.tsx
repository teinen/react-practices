import React, { useReducer } from 'react'
import ToDoInput from './ToDoInput'
import ToDoList from './ToDoList'
import { ToDo } from '../types/todo'

type State = {
  todos: Array<ToDo>
}

type Action =
  | { type: 'ADD_TODO', todo: ToDo }
  | { type: 'REMOVE_TODO', index: number }
  | { type: 'TOGGLE_STATUS', index: number, checked: boolean }
  | { type: 'TOGGLE_EDITING', index: number, isEditing: boolean }
  | { type: 'TOGGLE_ALL_STATUS', checked: boolean }
  | { type: 'EDIT_TODO', index: number, name: string }

const initialState: State = {
  todos: [
    {
      name: 'Sample todo',
      completed: false,
      isEditing: false
    }
  ]
}

const ToDoApp: React.FC = () => {
  const todoReducer = (state: State, action: Action): State => {
    switch(action.type) {
      case 'ADD_TODO':
        return {
          todos: [
            ...state.todos,
            action.todo
          ]
        }
      case 'REMOVE_TODO':
        state.todos.splice(action.index, 1)
        return { todos: state.todos }
      case 'TOGGLE_STATUS':
        state.todos[action.index].completed = action.checked
        return { todos: state.todos }
      case 'TOGGLE_EDITING':
        state.todos[action.index].isEditing = action.isEditing
        return { todos: state.todos }
      case 'TOGGLE_ALL_STATUS':
        return { todos: state.todos.map(todo => {
          todo.completed = action.checked
          return todo
        })}
      case 'EDIT_TODO':
        state.todos[action.index].name = action.name
        return { todos: state.todos }
      default:
        return state
    }
  }

  const [
    state,
    dispatch
  ] = useReducer(todoReducer, initialState)

  const addTodo = (newTodoName: string): void => {
    const newTodo: ToDo = {
      name: newTodoName,
      completed: false,
      isEditing: false
    }
    dispatch({ type: 'ADD_TODO', todo: newTodo })
  }

  const removeTodo = (index: number): void => {
    dispatch({ type: 'REMOVE_TODO', index: index })
  }

  const toggleStatus = (index: number, checked: boolean) => {
    dispatch({
      type: 'TOGGLE_STATUS',
      index: index,
      checked: checked
    })
  }

  const toggleEditing = (index: number, isEditing: boolean) => {
    dispatch({
      type: 'TOGGLE_EDITING',
      index: index,
      isEditing: isEditing
    })
  }

  const editTodo = (index: number, newName: string): void => {
    dispatch({
      type: 'EDIT_TODO',
      index: index,
      name: newName
    })
  }

  const appStyle = {
    maxWidth: '960px',
    margin: 'auto'
  }

  return (
    <div className="siimple-box siimple--bg-dark" style={appStyle}>
      <h1 className="siimple-box-title siimple--color-white siimple--text-center">
        React ToDo App
      </h1>

      <ToDoInput
        onClick={(newTodoName) => addTodo(newTodoName)}
      />

      <label className="siimple-label siimple--color-white">
        Check all todos:
      </label>
      <div className="siimple-checkbox">
        <input
          type="checkbox"
          id="checkall"
          onChange={(e) => dispatch({ type: 'TOGGLE_ALL_STATUS', checked: e.target.checked })}
        />
        <label htmlFor="checkall"></label>
      </div>

      <span className="siimple-rule"></span>

      <ToDoList
        todos={state.todos}
        onRemove={(i) => removeTodo(i)}
        onToggleStatus={(i, checked) => toggleStatus(i, checked)}
        onToggleEditing={(i, isEditing) => toggleEditing(i, isEditing)}
        onEdit={(i, newName) => editTodo(i, newName)}
      />
    </div>
  )
}

export default ToDoApp
