import Header from '@/components/layout/Header'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CreateGuildButton from '@/components/guilds/CreateGuildButton'
import { getServerSession } from 'next-auth'
import { getEligibleGuildLeaders } from '@/app/actions/guilds'

interface EligibleLeader {
  id: number
  name: string
  level: number
}

async function getGuilds() {
  return await prisma.guilds.findMany({
    include: {
      players: true, // Guild leader
      guild_membership: {
        include: {
          players: true
        }
      }
    },
    orderBy: {
      level: 'desc'
    }
  })
}

export default async function GuildsPage() {
  const session = await getServerSession()
  const guilds = await getGuilds()
  
  // Only fetch eligible leaders if user is logged in
  let eligibleLeaders: EligibleLeader[] = []
  if (session?.user?.email) {
    const account = await prisma.accounts.findFirst({
      where: { email: session.user.email },
      select: { id: true }
    })
    
    if (account) {
      eligibleLeaders = await getEligibleGuildLeaders(account.id)
    }
  }

  return (
    <main className="min-h-screen bg-tibia-darker">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h2 className="text-xl font-bold text-yellow-400 border-b border-tibia-accent pb-2 mb-4">
                Guild Actions
              </h2>
              {session ? (
                <div className="space-y-2">
                  <CreateGuildButton eligibleLeaders={eligibleLeaders} />
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  Please login to create or join a guild.
                </p>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-tibia-dark p-6 rounded-lg border border-tibia-accent">
              <h1 className="text-2xl font-bold text-yellow-400 border-b border-tibia-accent pb-2 mb-6">
                Active Guilds
              </h1>

              <div className="grid gap-4">
                {guilds.map((guild) => (
                  <Link
                    key={guild.id}
                    href={`/guilds/${guild.id}`}
                    className="bg-tibia-darker p-4 rounded-lg border border-tibia-accent hover:border-yellow-400 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {guild.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          Leader: {guild.players.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Level {guild.level} • {guild.guild_membership.length} members
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-yellow-400 font-medium">
                          {guild.points} points
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                {guilds.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">No guilds found.</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Be the first to create a guild!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}