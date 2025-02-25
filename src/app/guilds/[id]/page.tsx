import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import { getVocationName } from '@/utils/game'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import EditMotdButton from '@/components/guilds/EditMotdButton'
import { getServerSession } from 'next-auth/next'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function GuildPage({ params }: PageProps) {
  const resolvedParams = await params
  
  // Add type safety and validation for the ID
  if (!resolvedParams.id || isNaN(Number(resolvedParams.id))) {
    notFound()
  }

  const guildId = Number(resolvedParams.id)
  const session = await getServerSession()

  const guild = await prisma.guilds.findUnique({
    where: { id: guildId },
    include: {
      players: {
        include: {
          accounts: true
        }
      },
      guild_membership: {
        include: {
          players: true,
          guild_ranks: true
        }
      },
      guild_ranks: {
        orderBy: {
          level: 'desc'
        }
      }
    }
  })

  if (!guild) {
    notFound()
  }

  const isGuildLeader = session?.user?.email === guild.players.accounts.email

  return (
    <main className="min-h-screen bg-tibia-darker bg-[url('/images/bg-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        {/* Guild Header/Banner */}
        <div className="relative mb-8 bg-tibia-dark rounded-lg border border-tibia-accent overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-tibia-dark via-transparent to-transparent z-10" />
          <div className="relative z-20 p-8 flex items-center gap-6">
            <div className="w-24 h-24 bg-tibia-darker rounded-lg border-2 border-yellow-400 flex items-center justify-center">
              <span className="text-4xl">⚔️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                {guild.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  Level {guild.level}
                </span>
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">
                  {guild.guild_membership.length} Members
                </span>
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
                  {guild.points} Points
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Guild Info */}
          <div className="lg:col-span-4 space-y-4">
            {/* Leader Info */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 border-b border-tibia-accent pb-2 mb-4">
                Guild Leader
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-tibia-darker rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👑</span>
                </div>
                <div>
                  <Link 
                    href={`/characters/${guild.players.name}`}
                    className="text-white hover:text-yellow-400 transition font-medium"
                  >
                    {guild.players.name}
                  </Link>
                  <p className="text-sm text-gray-400">
                    Founded {new Date(guild.creationdata * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Message of the Day */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 border-b border-tibia-accent pb-2 mb-4">
                Message of the Day
              </h2>
              <div className="bg-tibia-darker p-4 rounded border border-tibia-accent">
                <p className="text-gray-300 italic">
                  "{guild.motd || 'No message set'}"
                </p>
              </div>
              <EditMotdButton 
                guildId={guild.id}
                currentMotd={guild.motd}
                isLeader={isGuildLeader}
              />
            </div>

            {/* Guild Stats */}
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 border-b border-tibia-accent pb-2 mb-4">
                Guild Statistics
              </h2>
              <div className="space-y-3">
                <div className="bg-tibia-darker p-4 rounded flex justify-between items-center">
                  <span className="text-gray-300">Balance</span>
                  <span className="text-yellow-400">{guild.balance.toString()} gold</span>
                </div>
                <div className="bg-tibia-darker p-4 rounded flex justify-between items-center">
                  <span className="text-gray-300">Total Members</span>
                  <span className="text-white">{guild.guild_membership.length}</span>
                </div>
                <div className="bg-tibia-darker p-4 rounded flex justify-between items-center">
                  <span className="text-gray-300">Guild Points</span>
                  <span className="text-green-400">{guild.points}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="lg:col-span-8">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <div className="flex justify-between items-center border-b border-tibia-accent pb-2 mb-4">
                <h2 className="text-xl font-bold text-yellow-400">
                  Guild Members
                </h2>
                <span className="px-3 py-1 bg-tibia-darker text-gray-300 rounded-full text-sm">
                  Total: {guild.guild_membership.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-tibia-darker">
                      <th className="p-3 text-yellow-400 font-medium text-left">Member</th>
                      <th className="p-3 text-yellow-400 font-medium text-left">Level</th>
                      <th className="p-3 text-yellow-400 font-medium text-left">Vocation</th>
                      <th className="p-3 text-yellow-400 font-medium text-left">Rank</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tibia-accent">
                    {guild.guild_membership.map((member) => (
                      <tr 
                        key={member.player_id} 
                        className="hover:bg-tibia-darker transition-colors"
                      >
                        <td className="p-3">
                          <Link 
                            href={`/characters/${member.players.name}`}
                            className="text-white hover:text-yellow-400 transition flex items-center gap-2"
                          >
                            {member.guild_ranks.level === 3 && <span className="text-yellow-400">👑</span>}
                            {member.players.name}
                          </Link>
                        </td>
                        <td className="p-3 text-green-400">
                          {member.players.level}
                        </td>
                        <td className="p-3 text-gray-300">
                          {getVocationName(member.players.vocation)}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            member.guild_ranks.level === 3 ? 'bg-yellow-600' :
                            member.guild_ranks.level === 2 ? 'bg-purple-600' :
                            'bg-blue-600'
                          } text-white`}>
                            {member.guild_ranks.name}
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