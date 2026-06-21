import './App.css'
import { BrowserRouter, Route, Routes } from "react-router"
import { NavBar } from './components/NavBar/NavBar'
import { Home } from './pages/Home/Home'
import { Projects } from './pages/Projects/Projects'
import { Contact } from './pages/Contact/Contact'

function App() {

  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
