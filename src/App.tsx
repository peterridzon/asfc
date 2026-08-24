import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Admin } from './pages/Admin'
import { Alerts } from './pages/Alerts'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Outlook } from './pages/Outlook'
import { Sources } from './pages/Sources'
import { UpdateLog } from './pages/UpdateLog'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The homepage stands on its own — no header or footer around it. */}
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="sources" element={<Sources />} />
          <Route path="outlook" element={<Outlook />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="update-log" element={<UpdateLog />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
