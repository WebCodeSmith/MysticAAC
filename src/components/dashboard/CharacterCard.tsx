'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getVocationName, getVocationAssets } from '@/utils/game'
import DeleteCharacterButton from '@/components/ui/DeleteCharacterButton'
import type { Character } from '@/services/dashboard.service'

export function CharacterCard({ character }: { character: Character }) {
  const { gif } = getVocationAssets(character.vocation)
  
  return (
    <div className={`bg-tibia-dark p-4 rounded-lg border ${
      character.deletion ? 'border-red-800 opacity-50' : 'border-tibia-accent'
    }`}>
      <div className="flex items-center gap-4">
        <figure className="relative w-[64px] h-[64px] m-0">
          <Image
            src={gif}
            alt={character.name}
            width={64}
            height={64}
            className={`${character.deletion ? 'grayscale' : ''}`}
            priority
          />
          {character.deletion && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
              <span className="text-red-500 font-semibold text-sm">DELETED</span>
            </div>
          )}
        </figure>

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className={`font-bold text-lg ${
                character.deletion ? 'text-red-500' : 'text-yellow-400'
              }`}>
                {character.name}
              </h3>
              <p className="text-gray-400">
                Level {character.level} - {getVocationName(character.vocation)}
              </p>
            </div>

            <div className="flex gap-2">
              {!character.deletion && (
                <>
                  <Link
                    href={`/characters/${character.name}`}
                    className="text-sm px-3 py-1 rounded transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View
                  </Link>
                  <DeleteCharacterButton
                    characterId={character.id}
                    characterName={character.name}
                  />
                </>
              )}
            </div>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-400">
              HP: <span className="text-red-400">{character.health}/{character.healthmax}</span>
            </div>
            <div className="text-gray-400">
              MP: <span className="text-blue-400">{character.mana}/{character.manamax}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}