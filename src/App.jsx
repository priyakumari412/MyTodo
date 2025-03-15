import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect((s) => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  const saveTols = (s) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveTols()
  }
  const handleEdit = (e, id) => {
    let p = todos.filter(i => i.id === id)
    setTodo(p[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTols()

  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTols()

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveTols()
  }
  const toggleFinished = (e) => {
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

            <button className='bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-4 text-white font-bold text-sm rounded-md disabled:bg-fuchsia-950' onClick={handleAdd} disabled={todo.length <= 2} >Add</button>

          </div>
          <input type="checkbox" className='mx-2 my-3' onChange={toggleFinished} checked={showFinished} />Show Finished

          <h2 className='text-lg font-bold my-3'>Your Todos</h2>

          <div className="Todos ">
            {todos.length === 0 && <div className='font-bold text-center'>No Todos are here!!</div>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="Todo flex justify-between my-2 w-3/4">
                <div className='flex gap-5'>
                  <input type="checkbox" onChange={handleCheckbox} checked={todo.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div>
                </div>

                <div className="buttons flex ">
                  <div className="edit bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-2 text-white font-bold text-sm rounded-md w-10" onClick={(e) => handleEdit(e, item.id)}>
                    Edit
                  </div>
                  <div className="delete bg-fuchsia-600 hover:bg-fuchsia-900 p-1 mx-2 text-white font-bold text-sm rounded-md cursor-pointer" onClick={(e) => { handleDelete(e, item.id) }}>
                    Delete
                  </div>
                </div>

              </div>
            })}
          </div>
      </div >


    </>
  )
}

export default App
