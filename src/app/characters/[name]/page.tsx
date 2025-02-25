import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { getVocationName, getVocationAssets } from '@/utils/game'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface PageProps {
  params: Promise<{
    name: string
  }>
}

export default async function CharacterPage({ params }: PageProps) {
  // Resolve and decode the character name from URL
  const resolvedParams = await params
  const characterName = decodeURIComponent(resolvedParams.name)

  const character = await prisma.players.findUnique({
    where: { 
      name: characterName 
    },
    select: {
      id: true,
      name: true,
      level: true,
      vocation: true,
      sex: true,
      health: true,
      healthmax: true,
      mana: true,
      manamax: true,
      experience: true,
      skill_fist: true,
      skill_club: true,
      skill_sword: true,
      skill_axe: true,
      skill_dist: true,
      skill_shielding: true,
      skill_fishing: true,
      maglevel: true,
      lastlogin: true,
      accounts: {
        select: {
          creation: true
        }
      }
    }
  })

  if (!character) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-tibia-darker bg-[url('/images/bg-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Hero Section */}
        <div className="relative mb-8 bg-tibia-dark rounded-lg border border-tibia-accent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-tibia-dark via-transparent to-transparent z-10" />
          <div className="relative z-20 p-8 flex items-center gap-6">
            <div className="w-24 h-24 bg-tibia-darker rounded-lg border-2 border-yellow-400 flex items-center justify-center overflow-hidden shadow-lg transform hover:scale-105 transition-transform">
              <Image
                src={getVocationAssets(character.vocation).gif}
                alt={getVocationName(character.vocation)}
                width={80}
                height={80}
                className="pixelated"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2 tracking-wide">
                {character.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold">
                  Level {character.level}
                </span>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                  {getVocationName(character.vocation)}
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-semibold">
                  {character.sex === 1 ? 'Male' : 'Female'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Status Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-tibia-dark rounded-lg border border-tibia-accent overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600/20 to-transparent px-6 py-4 border-b border-tibia-accent">
                <h2 className="text-xl font-bold text-yellow-400">Character Status</h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Health Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Health</span>
                    <span>{character.health}/{character.healthmax}</span>
                  </div>
                  <div className="w-full bg-tibia-darker rounded-full h-2.5">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(character.health / character.healthmax) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Mana Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-300 mb-1">
                    <span>Mana</span>
                    <span>{character.mana}/{character.manamax}</span>
                  </div>
                  <div className="w-full bg-tibia-darker rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(character.mana / character.manamax) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Experience Info */}
                <div className="bg-tibia-darker rounded-lg p-4">
                  <div className="flex justify-between text-gray-300 mb-2">
                    <span>Experience:</span>
                    <span className="font-mono">
                      {character.experience.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Last Login:</span>
                    <span>{new Date(Number(character.lastlogin) * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>Created:</span>
                    <span>{new Date(Number(character.accounts.creation) * 1000).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-tibia-dark rounded-lg border border-tibia-accent overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-600/20 to-transparent px-6 py-4 border-b border-tibia-accent">
                <h2 className="text-xl font-bold text-yellow-400">Skills & Abilities</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Combat Skills */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Combat Skills</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Magic Level', value: character.maglevel },
                        { name: 'Fist Fighting', value: character.skill_fist },
                        { name: 'Club Fighting', value: character.skill_club },
                        { name: 'Sword Fighting', value: character.skill_sword }
                      ].map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.value}</span>
                          </div>
                          <div className="w-full bg-tibia-darker rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(skill.value / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other Skills */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-yellow-400 mb-3">Other Skills</h3>
                    <div className="space-y-3">
                      {[
                        { name: 'Axe Fighting', value: character.skill_axe },
                        { name: 'Distance', value: character.skill_dist },
                        { name: 'Shielding', value: character.skill_shielding },
                        { name: 'Fishing', value: character.skill_fishing }
                      ].map(skill => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm text-gray-300 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.value}</span>
                          </div>
                          <div className="w-full bg-tibia-darker rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${(skill.value / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}