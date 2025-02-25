import Image from 'next/image'
import Link from 'next/link'
import CommunityDropdown from '../ui/CommunityDropdown'

export default function Header() {
  return (
    <header className="bg-tibia-dark p-4 rounded-lg shadow-lg mb-8 border border-tibia-accent">
      <div className="container mx-auto">
        {/* Logo and Title */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center">
          <div className="flex gap-6">
            <Link 
              href="/" 
              className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">🏠</span>
              Home
            </Link>
            <Link 
              href="/news" 
              className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">📰</span>
              News
            </Link>
            <Link 
              href="/ranking" 
              className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">🏆</span>
              Ranking
            </Link>
            <Link 
              href="/download" 
              className="text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">💾</span>
              Download
            </Link>
            <CommunityDropdown />
          </div>
        </nav>
      </div>
    </header>
  )
}