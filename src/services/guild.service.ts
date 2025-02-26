import { prisma } from '@/lib/prisma'

export interface GuildMember {
  id: number
  name: string
  level: number
}

export interface GuildLeadershipInfo {
  guildId: number
  guildName: string
  members: GuildMember[]
}

export async function getGuildLeadershipInfo(characterId: number): Promise<GuildLeadershipInfo | null> {
  const guild = await prisma.guilds.findFirst({
    where: { ownerid: characterId },
    include: {
      guild_membership: {
        include: {
          players: {
            select: {
              id: true,
              name: true,
              level: true
            }
          }
        }
      }
    }
  })

  if (!guild) return null

  const members = guild.guild_membership
    .map(membership => membership.players)
    .filter(player => player.id !== characterId)

  return {
    guildId: guild.id,
    guildName: guild.name,
    members: members as GuildMember[]
  }
}