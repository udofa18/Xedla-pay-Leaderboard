import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Body from './components/Body'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './components/Home'
import Leaderboard from './components/Leaderboard'
import Statisttics from './components/Statistics'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className='flex'>
        <Body />
        <div className=' w-full'>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
          <Route path="/dashboard/statistics" element={<Statisttics />} />
        </Routes>
        </div>
      </div>

    </>
  )
}

export default App
