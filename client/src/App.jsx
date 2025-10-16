import { Routes, Route } from 'react-router-dom'
import './App.css'
import Welcome from './components/source_pages/welcome/Welcome'
import ProDashboard from './components/pro_pages/dashboard/ProDashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        
        
        <Route path='/pro-dash' element={<ProDashboard/>}/>

      </Routes>
    </>
  )
}

export default App
