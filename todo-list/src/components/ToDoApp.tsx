import React, { useReducer } from 'react'
import '../style/ToDoApp.css'
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
  | { type: 'TOGGLE_ALL_STATUS', checked: boolean }
  | { type: 'EDIT_TODO', index: number, name: string }

const initialState: State = {
  todos: [
    {
      name: 'Sample todo',
      completed: false
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
      completed: false
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

  const editTodo = (index: number, newName: string): void => {
    dispatch({
      type: 'EDIT_TODO',
      index: index,
      name: newName
    })
  }

  return (
    <div className="todo-app">
      <h1 className="todo-app-title">React ToDo App</h1>

      <ToDoInput
        onClick={(newTodoName) => addTodo(newTodoName)}
      />

      <label>
        <input
          type="checkbox"
          onChange={(e) => dispatch({ type: 'TOGGLE_ALL_STATUS', checked: e.target.checked })}
        />Check All ToDos
      </label>

      <ToDoList
        todos={state.todos}
        onRemove={(i) => removeTodo(i)}
        onToggleStatus={(i, checked) => toggleStatus(i, checked)}
        onEdit={(i, newName) => editTodo(i, newName)}
      />
    </div>
  )
}

export default ToDoApp
