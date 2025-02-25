'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createGuild } from '@/app/actions/guilds'

export default function CreateGuildButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [guildName, setGuildName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await createGuild(guildName)
      if (result.success) {
        router.refresh()
        router.push(`/guilds/${result.guildId}`)
      } else {
        alert(result.error)
      }
    } catch (error) {
      alert('Failed to create guild')
    }

    setIsLoading(false)
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
      >
        Create Guild
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent w-full max-w-md">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">
              Create New Guild
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">
                  Guild Name
                </label>
                <input
                  type="text"
                  value={guildName}
                  onChange={(e) => setGuildName(e.target.value)}
                  className="w-full bg-tibia-darker border border-tibia-accent text-white p-2 rounded"
                  required
                  minLength={3}
                  maxLength={32}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isLoading ? 'Creating...' : 'Create Guild'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}