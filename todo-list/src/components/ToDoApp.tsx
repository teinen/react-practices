import React, { useReducer } from 'react'
import '../style/ToDoApp.css'
import ToDoInput from './ToDoInput'

type ToDo = {
  name: string,
  completed: boolean
}

interface IState {
  todos: Array<ToDo>
}

type Action =
  | { type: 'ADD_TODO', todo: ToDo }
  | { type: 'REMOVE_TODO', index: number }
  | { type: 'TOGGLE_STATUS', index: number, completed: boolean }

const initialState: IState = {
  todos: [
    {
      name: 'Sample todo',
      completed: false
    }
  ]
}

const ToDoApp: React.FC = () => {
  const todoReducer = (state: IState, action: Action): IState => {
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

  const renderTodos = state.todos.map((todo, i) => {
    return (
      <li key={i}>
        {todo.name}, state: {todo.completed.toString()}
        <button onClick={() => { dispatch({ type: 'REMOVE_TODO', index: i }) }}>
          Remove
        </button>
      </li>
    )
  })

  return (
    <div className="todo-app">
      <h1 className="todo-app-title">React ToDo App</h1>

      <ToDoInput
        onClick={(newTodoName) => { addTodo(newTodoName) }}
      />

      <ul>
        {renderTodos}
      </ul>
    </div>
  )
}

export default ToDoApp
