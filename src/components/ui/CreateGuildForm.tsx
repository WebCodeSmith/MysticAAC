'use client'

import { useState } from 'react'
import { createGuild } from '@/app/actions/guilds'

interface CreateGuildFormProps {
  accountCharacters: {
    id: number
    name: string
    level: number
  }[]
  onSuccess?: () => void
}

export default function CreateGuildForm({ accountCharacters, onSuccess }: CreateGuildFormProps) {
  const [selectedCharId, setSelectedCharId] = useState('')
  const [guildName, setGuildName] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!selectedCharId) {
      setError('Please select a character to create the guild')
      return
    }

    const result = await createGuild({
      name: guildName,
      leaderId: Number(selectedCharId)
    })

    if (!result.success) {
      setError(result.error || 'Failed to create guild')
      return
    }

    onSuccess?.() // Call onSuccess function if it exists
    window.location.href = `/guilds/${result.guildId}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300 mb-2">Guild Name</label>
        <input
          type="text"
          value={guildName}
          onChange={(e) => setGuildName(e.target.value)}
          className="w-full bg-tibia-darker border border-tibia-accent rounded px-3 py-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 mb-2">Select Leader</label>
        <select
          value={selectedCharId}
          onChange={(e) => setSelectedCharId(e.target.value)}
          className="w-full bg-tibia-darker border border-tibia-accent rounded px-3 py-2 text-white"
          required
        >
          <option value="">Select a character</option>
          {accountCharacters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name} (Level {char.level})
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="p-3 bg-red-900/50 border border-red-500 text-red-400 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Guild
      </button>
    </form>
  )
}