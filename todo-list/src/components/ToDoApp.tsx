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

  return (
    <div className="todo-app">
      <h1 className="todo-app-title">React ToDo App</h1>

      <ToDoInput
        onClick={(newTodoName) => addTodo(newTodoName)}
      />

      <input
        type="checkbox"
        onChange={(e) => dispatch({ type: 'TOGGLE_ALL_STATUS', checked: e.target.checked })}
      />Check All ToDos

      <ToDoList
        todos={state.todos}
        onRemove={(i) => dispatch({ type: 'REMOVE_TODO', index: i })}
        onToggleStatus={(i, checked) => dispatch({ type: 'TOGGLE_STATUS', index: i, checked: checked })}
      />
    </div>
  )
}

export default ToDoApp
