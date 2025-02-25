import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { getVocationName, getVocationAssets } from '@/utils/game'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    name: string
  }
}

export default async function CharacterPage({ params }: PageProps) {
  // Decodificar o nome do personagem da URL
  const characterName = decodeURIComponent(params.name)

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
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Informações Principais */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-tibia-accent">
                <div className="w-20 h-20 bg-tibia-darker rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={getVocationAssets(character.vocation).gif}
                    alt={getVocationName(character.vocation)}
                    width={64}
                    height={64}
                    className="pixelated"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-yellow-400">{character.name}</h1>
                  <p className="text-gray-300">
                    Level {character.level} {getVocationName(character.vocation)}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Sex:</span>
                  <span>{character.sex === 1 ? 'Male' : 'Female'}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Health:</span>
                  <span>{character.health}/{character.healthmax}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Experience:</span>
                  <span>{character.experience.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Last Login:</span>
                  <span>{new Date(Number(character.lastlogin) * 1000).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Created:</span>
                  <span>{new Date(Number(character.accounts.creation) * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
                Skills
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Magic Level:</span>
                    <span>{character.maglevel}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Fist Fighting:</span>
                    <span>{character.skill_fist}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Club Fighting:</span>
                    <span>{character.skill_club}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Sword Fighting:</span>
                    <span>{character.skill_sword}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Axe Fighting:</span>
                    <span>{character.skill_axe}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Distance Fighting:</span>
                    <span>{character.skill_dist}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shielding:</span>
                    <span>{character.skill_shielding}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Fishing:</span>
                    <span>{character.skill_fishing}</span>
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