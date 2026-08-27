import { Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import EntryForm from './pages/EntryForm/EntryForm'
import Stats from './pages/Stats/Stats'
import Settings from './pages/Settings/Settings'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/koti" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/uusi" element={<ProtectedRoute><EntryForm /></ProtectedRoute>} />
      <Route path="/tilastot" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
      <Route path="/asetukset" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
    </Routes>
  )
}

export default App