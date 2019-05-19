import React, { useState } from 'react'
import '../style/ToDoApp.css'
import ToDoInput from './ToDoInput'

const ToDoApp: React.FC = () => {
  const defaultTodos: Array<Object> = [
    {
      title: 'Sample todo',
      completed: true
    }
  ]

  const [todos, updateTodos] = useState(defaultTodos)

  const clickHandler = (newTodo: string): void => {
    console.log(newTodo)
  }

  return (
    <div className="todo-app">
      <h1 className="todo-app-title">React ToDo App</h1>

      <ToDoInput
        onClick={(newTodo) => { clickHandler(newTodo) }}
      />
    </div>
  )
}

export default ToDoApp;
