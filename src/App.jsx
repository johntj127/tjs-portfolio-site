import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import AppShell      from './shell/AppShell.jsx'
import Overview      from './sections/Overview.jsx'
import About         from './sections/About.jsx'
import Projects      from './sections/Projects.jsx'
import ProjectDetail from './sections/ProjectDetail.jsx'
import Experience    from './sections/Experience.jsx'
import Contact       from './sections/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index                element={<Navigate to="/overview" replace />} />
        <Route path="/overview"     element={<Overview />} />
        <Route path="/about"        element={<About />} />
        <Route path="/work"         element={<Projects />} />
        <Route path="/work/:id"     element={<ProjectDetail />} />
        <Route path="/experience"   element={<Experience />} />
        <Route path="/contact"      element={<Contact />} />

        {/* Legacy redirects */}
        <Route path="/projects"     element={<Navigate to="/work"       replace />} />
        <Route path="/projects/:id" element={<Navigate to="/work"       replace />} />
        <Route path="/skills"       element={<Navigate to="/about"      replace />} />
        <Route path="/recognition"  element={<Navigate to="/experience" replace />} />
      </Route>

      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  )
}
