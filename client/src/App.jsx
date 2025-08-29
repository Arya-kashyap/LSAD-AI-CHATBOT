import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  return (
    <div className="w-full h-full box-border overflow-hidden">
      {/* <header> */}
        <Navbar toggleSidebar={toggleSidebar} />
      {/* </header>
      <main> */}
        <Routes>
          <Route path="/" element={<Home visible={sidebarVisible} toggleSidebar={toggleSidebar} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      {/* </main> */}
    </div>
  );
}

export default App;
