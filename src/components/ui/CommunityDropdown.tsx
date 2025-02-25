'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function CommunityDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fecha o dropdown quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const menuItems = [
    { label: 'Characters', href: '/characters/search' },
    { label: 'Guilds', href: '/guilds' },
    { label: 'Houses', href: '/houses' },
    { label: 'Who is Online', href: '/online' },
    { label: 'Latest Deaths', href: '/deaths' },
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white hover:text-yellow-400 transition-colors flex items-center gap-2 ${
          isOpen ? 'text-yellow-400' : ''
        }`}
      >
        <span className="text-yellow-400">👥</span>
        Community
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-48 rounded-lg bg-tibia-dark border border-tibia-accent shadow-lg">
          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-tibia-darker hover:text-yellow-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}