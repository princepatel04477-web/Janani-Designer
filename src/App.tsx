import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { BasketProvider } from './context/BasketContext'
import Home from './pages/Home'
import Sarees from './pages/Sarees'
import Lehengas from './pages/Lehengas'
import Collections from './pages/Collections'
import Design from './pages/Design'
import Enquiry from './pages/Enquiry'
import Craft from './pages/Craft'
import Partner from './pages/Partner'
import Contact from './pages/Contact'
import Styleguide from './pages/Styleguide'

export default function App() {
  return (
    <BasketProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sarees" element={<Sarees />} />
          <Route path="/sarees/collections" element={<Collections firmPreset="jdt" />} />
          <Route path="/lehengas" element={<Lehengas />} />
          <Route path="/lehengas/collections" element={<Collections firmPreset="jdw" />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/design/:code" element={<Design />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/craft" element={<Craft />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/styleguide" element={<Styleguide />} />
        </Routes>
      </Layout>
    </BasketProvider>
  )
}
