import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AlertPopup } from './components/AlertPopup'
import { useSyncHtmlLang } from './lib/i18n/useTranslation'
import { Layout } from './components/Layout'
import { TutorialOnDemand } from './components/TutorialOnDemand'
import { WelcomeTutorial } from './components/WelcomeTutorial'
import { Admin } from './pages/Admin'
import { Archive } from './pages/Archive'
import { AlertsArchive } from './pages/AlertsArchive'
import { ArchiveOutlookRegions } from './pages/ArchiveOutlookRegions'
import { ArchiveRoot } from './pages/ArchiveRoot'
import { Alerts } from './pages/Alerts'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Outlook } from './pages/Outlook'
import { OutlookRegions } from './pages/OutlookRegions'
import { Settings } from './pages/Settings'
import { Sources } from './pages/Sources'
import { UpdateLog } from './pages/UpdateLog'

export function App() {
  useSyncHtmlLang()

  return (
    <BrowserRouter>
      {/* First-ever visit only. Disclaimer and alerts wait for this to close. */}
      <WelcomeTutorial />
      {/* Replayable any time via openTutorial(), e.g. the homepage button. */}
      <TutorialOnDemand />
      {/* Greets the visitor with any published alerts, on whichever page they land. */}
      <AlertPopup />
      <Routes>
        {/* The homepage stands on its own — no header or footer around it. */}
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="sources" element={<Sources />} />
          <Route path="outlook" element={<OutlookRegions />} />
          <Route path="outlook/:region" element={<Outlook />} />
          <Route path="archive" element={<ArchiveRoot />} />
          <Route path="archive/outlook" element={<ArchiveOutlookRegions />} />
          <Route path="archive/outlook/:region" element={<Archive />} />
          <Route path="archive/alerts" element={<AlertsArchive />} />
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
