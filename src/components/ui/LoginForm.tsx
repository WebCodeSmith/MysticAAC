'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginForm() {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  async function handleSubmit(formData: FormData) {
    const result = await signIn('credentials', {
      name: formData.get('account'),
      password: formData.get('password'),
      redirect: false
    })

    if (result?.error) {
      setMessage('Login falhou. Verifique suas credenciais.')
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  if (session) {
    return (
      <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
        <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
          Account Status
        </h2>
        <div className="space-y-4">
          <div className="text-gray-300">
            <p>Logged in as: <span className="text-white">{session.user?.name}</span></p>
          </div>
          <div className="space-y-2">
            <Link 
              href="/dashboard"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <span>🎮</span>
              <span>Manage Account</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
      <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
        Account Login
      </h2>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <input 
            name="account"
            type="text"
            placeholder="Account Name"
            className="w-full p-2 bg-tibia-accent text-white rounded"
            required
          />
        </div>
        <div>
          <input 
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-tibia-accent text-white rounded"
            required
          />
        </div>
        {message && (
          <p className={`text-sm ${message.includes('sucesso') ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </div>
  )
}