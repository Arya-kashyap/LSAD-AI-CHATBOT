import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Signup from './components/Signup'
import Signin from './components/Signin'

function App() {
  return (
    <div className="max-w-full max-h-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App
