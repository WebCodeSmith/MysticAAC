import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { getVocationName, getVocationAssets } from '@/utils/game'
import Image from 'next/image'
import Link from 'next/link'

interface RankingPlayer {
  id: number
  name: string
  level: number
  vocation: number
  experience: bigint
}

export default async function RankingPage() {
  const players = await prisma.players.findMany({
    take: 100,
    orderBy: { level: 'desc' },
    select: {
      id: true,
      name: true,
      level: true,
      vocation: true,
      experience: true
    }
  }) as RankingPlayer[]

  return (
    <main className="min-h-screen bg-tibia-darker bg-[url('/images/bg-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar com filtros */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h3 className="text-xl font-bold mb-4 text-yellow-400 border-b border-tibia-accent pb-2">
                Ranking Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Vocation</label>
                  <select className="w-full bg-tibia-darker border border-tibia-accent text-white p-2 rounded">
                    <option value="">All Vocations</option>
                    <option value="1">Sorcerers</option>
                    <option value="2">Druids</option>
                    <option value="3">Paladins</option>
                    <option value="4">Knights</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white mb-2">Category</label>
                  <select className="w-full bg-tibia-darker border border-tibia-accent text-white p-2 rounded">
                    <option value="level">Level</option>
                    <option value="magic">Magic Level</option>
                    <option value="skills">Skills</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Ranking */}
          <div className="lg:col-span-9">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400 border-b border-tibia-accent pb-2">
                Top 100 Players
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left bg-tibia-darker">
                      <th className="p-3 text-yellow-400 font-bold">Rank</th>
                      <th className="p-3 text-yellow-400 font-bold">Character</th>
                      <th className="p-3 text-yellow-400 font-bold">Level</th>
                      <th className="p-3 text-yellow-400 font-bold">Vocation</th>
                      <th className="p-3 text-yellow-400 font-bold">Experience</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tibia-accent">
                    {players.map((player, index) => (
                      <tr 
                        key={player.id}
                        className="hover:bg-tibia-darker transition-colors"
                      >
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {index < 3 ? (
                              <div className="w-8 h-8 flex items-center justify-center">
                                {index === 0 && <span className="text-2xl">🥇</span>}
                                {index === 1 && <span className="text-2xl">🥈</span>}
                                {index === 2 && <span className="text-2xl">🥉</span>}
                              </div>
                            ) : (
                              <span className="text-gray-400 w-8 text-center">{index + 1}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-tibia-darker rounded-lg flex items-center justify-center overflow-hidden">
                              <Image
                                src={getVocationAssets(player.vocation).gif}
                                alt={getVocationName(player.vocation)}
                                width={32}
                                height={32}
                                className="pixelated"
                              />
                            </div>
                            <Link 
                              href={`/characters/${player.name}`}
                              className="text-white font-medium hover:text-yellow-400 transition-colors"
                            >
                              {player.name}
                            </Link>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="text-green-400 font-bold">{player.level}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-300">{getVocationName(player.vocation)}</span>
                        </td>
                        <td className="p-3">
                          <span className="text-gray-300">
                            {player.experience.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}