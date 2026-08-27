import { Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import EntryForm from './pages/EntryForm/EntryForm'
import Stats from './pages/Stats/Stats'
import Settings from './pages/Settings/Settings'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/koti" element={<Home />} />
      <Route path="/uusi" element={<EntryForm />} />
      <Route path="/tilastot" element={<Stats />} />
      <Route path="/asetukset" element={<Settings />} />
    </Routes>
  )
}

export default App