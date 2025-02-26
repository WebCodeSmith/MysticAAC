import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { getVocationName, getVocationAssets } from '@/utils/game'
import { Metadata } from 'next'

// Função para buscar personagens
async function searchCharacters(query: string) {
  if (!query) return []
  
  return await prisma.players.findMany({
    where: {
      name: {
        contains: query
      },
      deletion: 0 // Add this condition to filter out deleted characters
    },
    take: 10,
    select: {
      id: true,
      name: true,
      level: true,
      vocation: true
    }
  })
}

export const metadata: Metadata = {
  title: 'Character Search',
  description: 'Search for characters in MysticAAC'
}

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>
}

export default async function CharacterSearch({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams
  const query = params?.q || ''
  const characters = query ? await searchCharacters(query) : []

  return (
    <main className="min-h-screen bg-tibia-darker">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">Search Characters</h1>
            
            {/* Search Form */}
            <form className="mb-8">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="q"
                  defaultValue={query}
                  placeholder="Enter character name..."
                  className="flex-1 bg-tibia-darker border border-tibia-accent text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-400"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Results with Outfit */}
            {query && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-300 mb-4">
                  Search Results for "{query}"
                </h2>
                
                {characters.length > 0 ? (
                  <div className="divide-y divide-tibia-accent">
                    {characters.map((character) => (
                      <Link
                        key={character.id}
                        href={`/characters/${character.name}`}
                        className="block p-4 hover:bg-tibia-darker transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-tibia-darker rounded-lg flex items-center justify-center overflow-hidden">
                            <Image
                              src={getVocationAssets(character.vocation).gif}
                              alt={getVocationName(character.vocation)}
                              width={48}
                              height={48}
                              className="pixelated animate-spin-slow"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-white font-medium">{character.name}</h3>
                            <p className="text-sm text-gray-400">
                              Level {character.level} - {getVocationName(character.vocation)}
                            </p>
                          </div>
                          <svg 
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No characters found matching "{query}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}