import React, { useReducer } from 'react'
import '../style/ToDoApp.css'
import ToDoInput from './ToDoInput'
import ToDoList from './ToDoList'
import { ToDo } from '../types'

type State = {
  todos: Array<ToDo>
}

type Action =
  | { type: 'ADD_TODO', todo: ToDo }
  | { type: 'REMOVE_TODO', index: number }
  | { type: 'TOGGLE_STATUS', index: number, completed: boolean }

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
        const newTodos = [
          ...state.todos,
          action.todo
        ]
        return { todos: newTodos }
      case 'REMOVE_TODO':
        state.todos.splice(action.index, 1)
        return { todos: state.todos }
      case 'TOGGLE_STATUS':
        state.todos[action.index].completed = action.completed
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

  return (
    <div className="todo-app">
      <h1 className="todo-app-title">React ToDo App</h1>

      <ToDoInput
        onClick={(newTodoName) => { addTodo(newTodoName) }}
      />

      <ToDoList
        todos={state.todos}
        onRemove={(i) => { dispatch({ type: 'REMOVE_TODO', index: i }) }}
      />
    </div>
  )
}

export default ToDoApp
