import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import InfoModal from './components/InfoModal'
import type { TabType } from './components/InfoModal'
import './index.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('products')

  const handleOpenModal = (tab: TabType) => {
    setActiveTab(tab)
    setIsModalOpen(true)
  }

  return (
    <div className="w-full min-h-screen">
      <Navbar onOpenModal={handleOpenModal} />
      <Hero onOpenModal={handleOpenModal} />
      <InfoModal
        isOpen={isModalOpen}
        activeTab={activeTab}
        onClose={() => setIsModalOpen(false)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />
    </div>
  )
}

export default App
