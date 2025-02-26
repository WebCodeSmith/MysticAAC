'use client'

import { useState } from 'react'
import CreateGuildForm from '../ui/CreateGuildForm'

interface CreateGuildButtonProps {
  eligibleLeaders: {
    id: number
    name: string
    level: number
  }[]
}

export default function CreateGuildButton({ eligibleLeaders }: CreateGuildButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded font-semibold"
      >
        Create New Guild
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-tibia-dark border border-tibia-accent rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-yellow-400">Create New Guild</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <CreateGuildForm 
              accountCharacters={eligibleLeaders}
              onSuccess={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  )
}