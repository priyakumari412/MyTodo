import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-fuchsia-200 text-gray-900  px-8 py-2' >
        <div className="logo">
          <span className='font-bold text-xl'>MyTodo</span>
        </div>
        <ul className="flex gap-6 ">
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>YourTasks</li>
            
        </ul>
    </nav>
  )
}

export default Navbar