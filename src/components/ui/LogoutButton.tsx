'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
    >
      Logout
    </button>
  )
}