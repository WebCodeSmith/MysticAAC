'use client'

import { useState } from 'react'
import { deleteCharacter } from '@/app/actions/characters'

interface DeleteCharacterButtonProps {
  characterId: number
  characterName: string
}

export default function DeleteCharacterButton({ characterId, characterName }: DeleteCharacterButtonProps) {
  const [showModal, setShowModal] = useState(false)
  const [showGuildModal, setShowGuildModal] = useState(false)
  const [guildInfo, setGuildInfo] = useState<{
    guildId: number
    guildName: string
    members: { id: number; name: string; level: number }[]
  } | null>(null)
  const [selectedNewLeader, setSelectedNewLeader] = useState<number>(0)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleDelete() {
    setError('')

    // Check if character is guild leader
    const response = await fetch(`/api/characters/${characterId}/guild-leadership`)
    const data = await response.json()

    if (data.isGuildLeader) {
      setGuildInfo(data.guildInfo)
      setShowGuildModal(true)
      return
    }

    // Normal deletion process
    const result = await deleteCharacter(characterId, password)
    
    if (!result.success) {
      setError(result.error || 'Failed to delete character')
      return
    }

    setShowModal(false)
    window.location.reload()
  }

  async function handleGuildAction(action: 'delete' | 'transfer') {
    if (action === 'transfer' && !selectedNewLeader) {
      setError('Please select a new leader')
      return
    }

    const result = await deleteCharacter(characterId, password, {
      guildAction: action,
      newLeaderId: selectedNewLeader
    })

    if (!result.success) {
      setError(result.error || 'Failed to process request')
      return
    }

    setShowGuildModal(false)
    setShowModal(false)
    window.location.reload()
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
      >
        Delete
      </button>

      {/* Delete Character Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-tibia-dark border border-tibia-accent rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Delete Character</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete {characterName}?
            </p>
            
            <input
              type="password"
              placeholder="Account Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-tibia-darker border border-tibia-accent rounded px-3 py-2 text-white mb-4"
            />

            {error && (
              <div className="p-3 mb-4 bg-red-900/50 border border-red-500 text-red-400 rounded">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Guild Leadership Modal */}
      {showGuildModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-tibia-dark border border-tibia-accent rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Guild Leadership Required</h3>
            <p className="text-gray-300 mb-4">
              This character is the leader of guild "{guildInfo?.guildName}". 
              What would you like to do?
            </p>

            {error && (
              <div className="p-3 mb-4 bg-red-900/50 border border-red-500 text-red-400 rounded">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={() => handleGuildAction('delete')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete Guild and All Members
              </button>

              <div>
                <select
                  value={selectedNewLeader}
                  onChange={(e) => setSelectedNewLeader(Number(e.target.value))}
                  className="w-full bg-tibia-darker border border-tibia-accent rounded px-3 py-2 text-white mb-2"
                >
                  <option value={0}>Select New Leader</option>
                  {guildInfo?.members.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name} (Level {member.level})
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleGuildAction('transfer')}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Transfer Leadership
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}