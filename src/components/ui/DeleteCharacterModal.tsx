'use client'

import { useState } from 'react'

interface DeleteCharacterModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (password: string) => void
  characterName: string
  isLoading: boolean
  error?: string | null
}

export default function DeleteCharacterModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  characterName,
  isLoading,
  error 
}: DeleteCharacterModalProps) {
  const [password, setPassword] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-tibia-dark border border-tibia-accent rounded-lg p-6 w-96">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Confirm Deletion</h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-500 text-red-400 rounded">
            {error}
          </div>
        )}

        <p className="text-gray-300 mb-4">
        Enter your password to confirm deletion. <span className="text-yellow-400">{characterName}</span>
        </p>
        
        <input
          type="password"
          placeholder="Account password"
          className="w-full bg-tibia-darker border border-tibia-accent rounded px-3 py-2 text-white mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            onClick={() => onConfirm(password)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-2"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <>
                <span className="animate-spin">⚡</span>
                <span>Deleting...</span>
              </>
            ) : (
              'Confirm Deletion'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}