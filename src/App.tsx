import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Styleguide from './pages/Styleguide'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/styleguide" element={<Styleguide />} />
    </Routes>
  )
}
