'use client'

import { useState } from 'react'
import { createCharacter } from '@/app/actions/characters'
import { generateRandomName } from '@/utils/nameGenerator'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CreateCharacterForm() {
  const [name, setName] = useState('')
  const [vocation, setVocation] = useState('1') // Default to Sorcerer
  const [sex, setSex] = useState('1') // Default to Male
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const vocations = [
    { id: '1', name: 'Sorcerer', icon: '/images/vocations/sorcerer.gif' },
    { id: '2', name: 'Druid', icon: '/images/vocations/druid.gif' },
    { id: '3', name: 'Paladin', icon: '/images/vocations/paladin.gif' },
    { id: '4', name: 'Knight', icon: '/images/vocations/knight.gif' }
  ]

  async function handleSubmit(formData: FormData) {
    const data = {
      name: formData.get('name') as string,
      vocation: Number(formData.get('vocation')),
      sex: Number(formData.get('sex'))
    }

    const result = await createCharacter(data)

    if (result.success) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setMessage(result.error || 'Failed to create character')
    }
  }

  return (
    <div className="bg-tibia-dark p-8 rounded-lg border border-tibia-accent">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Create New Character</h2>

      <form action={handleSubmit} className="space-y-8">
        {/* Name Input with Suggest Button */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Character Name
          </label>
          <div className="flex gap-2">
            <input
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 bg-tibia-darker border border-tibia-accent text-white rounded focus:outline-none focus:border-yellow-400 transition"
              required
              minLength={3}
              maxLength={20}
            />
            <button
              type="button"
              onClick={() => setName(generateRandomName())}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
            >
              <span>🎲</span>
              Suggest
            </button>
          </div>
        </div>

        {/* Sex Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={`
              flex items-center justify-center gap-2 p-4 rounded cursor-pointer
              ${sex === '1' ? 'bg-blue-600' : 'bg-tibia-darker'}
              border border-tibia-accent hover:border-yellow-400 transition
            `}>
              <input
                type="radio"
                name="sex"
                value="1"
                checked={sex === '1'}
                onChange={(e) => setSex(e.target.value)}
                className="hidden"
              />
              <span className="text-xl">👨</span>
              <span className="text-white">Male</span>
            </label>
            <label className={`
              flex items-center justify-center gap-2 p-4 rounded cursor-pointer
              ${sex === '0' ? 'bg-pink-600' : 'bg-tibia-darker'}
              border border-tibia-accent hover:border-yellow-400 transition
            `}>
              <input
                type="radio"
                name="sex"
                value="0"
                checked={sex === '0'}
                onChange={(e) => setSex(e.target.value)}
                className="hidden"
              />
              <span className="text-xl">👩</span>
              <span className="text-white">Female</span>
            </label>
          </div>
        </div>

        {/* Vocation Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Vocation
          </label>
          <div className="grid grid-cols-2 gap-4">
            {vocations.map((voc) => (
              <label
                key={voc.id}
                className={`
                  flex items-center gap-3 p-4 rounded cursor-pointer
                  ${vocation === voc.id ? 'bg-green-600' : 'bg-tibia-darker'}
                  border border-tibia-accent hover:border-yellow-400 transition
                `}
              >
                <input
                  type="radio"
                  name="vocation"
                  value={voc.id}
                  checked={vocation === voc.id}
                  onChange={(e) => setVocation(e.target.value)}
                  className="hidden"
                />
                <Image
                  src={voc.icon}
                  alt={voc.name}
                  width={32}
                  height={32}
                  className="pixelated"
                />
                <span className="text-white">{voc.name}</span>
              </label>
            ))}
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded ${
            message.includes('success') 
              ? 'bg-green-900/50 border border-green-500 text-green-400' 
              : 'bg-red-900/50 border border-red-500 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white p-4 rounded font-medium hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⚔️</span>
              Creating Character...
            </>
          ) : (
            <>
              <span>⚔️</span>
              Create Character
            </>
          )}
        </button>
      </form>
    </div>
  )
}