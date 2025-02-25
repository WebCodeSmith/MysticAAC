'use client'

import { useState } from 'react'
import { createAccount } from '@/app/actions/auth'

export default function RegisterForm() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage('')

    const data = {
      name: formData.get('account') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    }

    if (data.password !== data.confirmPassword) {
      setMessage('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    const result = await createAccount(data)
    
    if (!result.success) {
      setMessage(result.error || 'Erro ao criar conta')
    } else {
      setMessage('Conta criada com sucesso!')
    }

    setIsLoading(false)
  }

  return (
    <div className="bg-tibia-dark p-8 rounded-lg border border-tibia-accent">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Create Your Account</h2>
      
      <form action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="account" className="block text-sm font-medium text-gray-300">
            Account Name
          </label>
          <input 
            id="account"
            name="account"
            type="text"
            placeholder="Enter your account name"
            className="w-full p-3 bg-tibia-darker border border-tibia-accent text-white rounded focus:outline-none focus:border-yellow-400 transition"
            required
            minLength={4}
            maxLength={32}
          />
          <p className="text-xs text-gray-400">
            4-32 characters, letters and numbers only
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input 
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 bg-tibia-darker border border-tibia-accent text-white rounded focus:outline-none focus:border-yellow-400 transition"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input 
            id="password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            className="w-full p-3 bg-tibia-darker border border-tibia-accent text-white rounded focus:outline-none focus:border-yellow-400 transition"
            required
            minLength={8}
          />
          <p className="text-xs text-gray-400">
            Minimum 8 characters
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <input 
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            className="w-full p-3 bg-tibia-darker border border-tibia-accent text-white rounded focus:outline-none focus:border-yellow-400 transition"
            required
            minLength={8}
          />
        </div>

        {message && (
          <div className={`p-4 rounded ${
            message.includes('sucesso') 
              ? 'bg-green-900/50 border border-green-500 text-green-400' 
              : 'bg-red-900/50 border border-red-500 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-3 rounded font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}