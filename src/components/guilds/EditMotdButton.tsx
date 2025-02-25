'use client'

import { useState } from 'react'
import { updateGuildMotd } from '@/app/actions/guilds'
import { useRouter } from 'next/navigation'

interface EditMotdButtonProps {
  guildId: number
  currentMotd: string
  isLeader: boolean
}

export default function EditMotdButton({ guildId, currentMotd, isLeader }: EditMotdButtonProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [motd, setMotd] = useState(currentMotd)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  if (!isLeader) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateGuildMotd(guildId, motd)
      if (result.success) {
        router.refresh() // This will trigger a server-side refresh
        setIsEditing(false)
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert('Failed to update message')
    }

    setIsLoading(false)
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={motd}
          onChange={(e) => setMotd(e.target.value)}
          className="w-full bg-tibia-darker border border-tibia-accent text-white p-3 rounded focus:outline-none focus:border-yellow-400"
          rows={3}
          maxLength={255}
        />
        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-3 py-1 text-gray-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition"
    >
      ✏️ Edit Message
    </button>
  )
}