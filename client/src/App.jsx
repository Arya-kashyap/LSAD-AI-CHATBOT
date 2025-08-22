import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'

function App() {

  const [SidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!SidebarVisible);
  
  return (
    <div className='w-screen max-h-screen box-border overflow-hidden'>
      <Navbar toggleSidebar={toggleSidebar}/>
      <Routes>
        <Route path={'/'} element={<Home Visible={SidebarVisible} toggleSidebar={toggleSidebar}/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  )
}

export default App
