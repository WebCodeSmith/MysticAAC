import Image from 'next/image'
import Link from 'next/link'
import CommunityDropdown from '../ui/CommunityDropdown'

export default function Header() {
  return (
    <header className="bg-tibia-dark p-2 sm:p-4 rounded-lg shadow-lg mb-8 border border-tibia-accent">
      <div className="container mx-auto">
        {/* Navigation */}
        <nav className="flex items-center justify-center sm:justify-start">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 px-2">
            <Link 
              href="/" 
              className="text-sm sm:text-base text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">🏠</span>
              Home
            </Link>
            <Link 
              href="/news" 
              className="text-sm sm:text-base text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">📰</span>
              News
            </Link>
            <Link 
              href="/ranking" 
              className="text-sm sm:text-base text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
            >
              <span className="text-yellow-400">🏆</span>
              Ranking
            </Link>
            <Link 
              href="/download" 
              className="text-sm sm:text-base text-white hover:text-yellow-400 transition-colors flex items-center gap-2"
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