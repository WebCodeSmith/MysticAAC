'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCharacter } from '@/app/actions/characters'
import DeleteCharacterModal from './DeleteCharacterModal'

interface DeleteCharacterButtonProps {
  characterId: number
  characterName: string
}

export default function DeleteCharacterButton({ characterId, characterName }: DeleteCharacterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(password: string) {
    try {
      setIsLoading(true)
      setError(null)
      
      const result = await deleteCharacter(characterId, password)
      
      if (result.success) {
        setIsModalOpen(false)
        router.refresh()
      } else {
        setError(result.error || 'Error deleting character')
      }
    } catch (error) {
      setError('Unexpected error while deleting character')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-sm px-3 py-1 rounded transition-colors bg-red-600 hover:bg-red-700 text-white"
      >
        Deletar
      </button>

      <DeleteCharacterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setError(null)
        }}
        onConfirm={handleDelete}
        characterName={characterName}
        isLoading={isLoading}
        error={error}
      />
    </>
  )
}