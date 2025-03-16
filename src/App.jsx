import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  // Load todos from localStorage on component mount
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      // Make sure we don't load null or undefined todos
      if (todos) {
        setTodos(todos)
      }
    }
  }, [])

  // Save todos to localStorage
  const saveTols = () => {
    if (todos.length === 0) {
      // If todos is empty, clear localStorage
      localStorage.removeItem("todos")
    } else {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  // Add a new todo
  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false }
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    setTodo("") // Clear input
    saveTols() // Save updated todos to localStorage
  }

  // Edit an existing todo
  const handleEdit = (e, id) => {
    const todoToEdit = todos.find(i => i.id === id)
    setTodo(todoToEdit.todo) // Set the value in the input field
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveTols() // Save updated todos to localStorage
  }

  // Delete a todo
  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)

    // If the todos list is empty, clear localStorage
    saveTols() // Save updated todos to localStorage
  }

  // Handle change in todo input field
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  // Toggle completion of a todo
  const handleCheckbox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    )
    setTodos(newTodos)
    saveTols() // Save updated todos to localStorage
  }

  // Toggle visibility of completed todos
  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto items-center bg-fuchsia-100 my-4 rounded-2xl py-4 px-5 text-gray-900 min-h-screen z-10">
        <h1 className='font-bold text-xl text-center my-5'>MyTodo - manage your routine easily</h1>
        
        <div className="addtodo">
          <h2 className='text-lg font-bold'>Add A Todo</h2>
          <input type="text" className='bg-white w-1/2 px-1' onChange={handleChange} value={todo} />
          <button 
            className='bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-4 text-white font-bold text-sm rounded-md disabled:bg-fuchsia-950' 
            onClick={handleAdd} 
            disabled={todo.length <= 2}
          >
            Add
          </button>
        </div>

        <input 
          type="checkbox" 
          className='mx-2 my-3' 
          onChange={toggleFinished} 
          checked={showFinished} 
        />
        Show Finished

        <h2 className='text-lg font-bold my-3'>Your Todos</h2>

        <div className="Todos ">
          {todos.length === 0 && <div className='font-bold text-center'>No Todos are here!!</div>}
          
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="Todo flex justify-between my-2 w-3/4">
                <div className='flex gap-5'>
                  <input 
                    type="checkbox" 
                    onChange={handleCheckbox} 
                    checked={item.isCompleted} 
                    name={item.id} 
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex ">
                  <div 
                    className="edit bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-2 text-white font-bold text-sm rounded-md w-10" 
                    onClick={(e) => handleEdit(e, item.id)}
                  >
                    Edit
                  </div>
                  <div 
                    className="delete bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-2 text-white font-bold text-sm rounded-md cursor-pointer" 
                    onClick={(e) => handleDelete(e, item.id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
