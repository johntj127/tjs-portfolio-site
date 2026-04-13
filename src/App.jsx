import React, { useState } from 'react'
import WorldMap          from './components/WorldMap/WorldMap.jsx'
import ProfessionalView  from './components/ProfessionalView/ProfessionalView.jsx'

export default function App() {
  const [proView, setProView] = useState(
    () => localStorage.getItem('tj_prefer_pro') === 'true'
  )

  const switchToPro = () => {
    localStorage.setItem('tj_prefer_pro', 'true')
    setProView(true)
  }

  const switchToGame = () => {
    localStorage.setItem('tj_prefer_pro', 'false')
    setProView(false)
  }

  if (proView) {
    return <ProfessionalView onSwitchToGame={switchToGame} />
  }

  return <WorldMap onSwitchToPro={switchToPro} />
}
