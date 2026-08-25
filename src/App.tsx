import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AlertPopup } from './components/AlertPopup'
import { Layout } from './components/Layout'
import { Admin } from './pages/Admin'
import { Alerts } from './pages/Alerts'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Outlook } from './pages/Outlook'
import { OutlookRegions } from './pages/OutlookRegions'
import { Settings } from './pages/Settings'
import { Sources } from './pages/Sources'
import { UpdateLog } from './pages/UpdateLog'

export function App() {
  return (
    <BrowserRouter>
      {/* Greets the visitor with any published alerts, on whichever page they land. */}
      <AlertPopup />
      <Routes>
        {/* The homepage stands on its own — no header or footer around it. */}
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="sources" element={<Sources />} />
          <Route path="outlook" element={<OutlookRegions />} />
          <Route path="outlook/:region" element={<Outlook />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="settings" element={<Settings />} />
          <Route path="update-log" element={<UpdateLog />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
