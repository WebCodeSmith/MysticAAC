'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteCharacter } from '@/app/actions/characters'

interface DeleteCharacterButtonProps {
  characterId: number
  characterName: string
}

export default function DeleteCharacterButton({ characterId, characterName }: DeleteCharacterButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!isConfirming) {
      setIsConfirming(true)
      return
    }

    setIsLoading(true)
    const result = await deleteCharacter(characterId)
    
    if (result.success) {
      router.refresh()
    } else {
      alert(result.error)
      setIsConfirming(false)
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className={`text-sm px-3 py-1 rounded transition-colors ${
        isConfirming
          ? 'bg-red-600 hover:bg-red-700'
          : 'bg-gray-600 hover:bg-gray-700'
      } text-white`}
    >
      {isLoading 
        ? 'Deletando...' 
        : isConfirming 
          ? `Confirmar exclusão de ${characterName}?` 
          : 'Deletar'
      }
    </button>
  )
}