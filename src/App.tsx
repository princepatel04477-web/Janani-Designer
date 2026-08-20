import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/layout/ScrollToTop'
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
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const location = useLocation()

  return (
    <BasketProvider>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Routes location={location}>
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
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </Layout>
    </BasketProvider>
  )
}
